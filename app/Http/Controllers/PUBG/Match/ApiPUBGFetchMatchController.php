<?php

namespace App\Http\Controllers\PUBG\Match;

use App\Http\Controllers\Controller;
use App\Http\Controllers\PUBG\ApiPUBGController;
use App\Models\Matchs\MatchsModel;
use App\Models\Teams\TeamsEventModel;
use App\Models\User;
use App\Utils\GlobalConst;
use DateTime;
use Illuminate\Http\Request;

class ApiPUBGFetchMatchController extends ApiPUBGController
{
	public array $messages = [
		'platform.required' => 'Поле platform является обязательным',
		'matchId.required'  => 'Поле matchId является обязательным',
		'event_id.required' => 'Поле event_id является обязательным',
	];

	public array $rules = [
		'platform' => 'required',
		'matchId'  => 'required',
		'event_id' => 'required|integer|exists:events,id',
	];

	/**
	 * Получение + сохранение матча
	 */
	public function getMatch(Request $request)
	{
		$this->validateParams($request, $this->messages, $this->rules);

		$platform = $request->query('platform');
		$matchId  = $request->query('matchId');
		$eventId  = $request->query('event_id');

		// ------------------------------------
		// 🔥 Проверка: матч уже существует?
		// ------------------------------------
		$existing = MatchsModel::where('match_id', $matchId)->first();

		if ($existing) {
			return response()->json([
				'result' => $existing->match_detailed,
				'cached' => true
			]);
		}

		// ------------------------------------
		// 🔥 Запрашиваем матч из PUBG API
		// ------------------------------------
		$url = "$this->url/$platform/matches/$matchId";
		$response = $this->curlSend($url);

		if (!$response) {
			return response()->json(['error' => 'PUBG API error'], 500);
		}

		$response = json_decode($response);
		$included = $response->included;

		$teams = [];
		$players = [];

		// ------------------------------------
		// 🔥 Собираем roster'ы и игроков
		// ------------------------------------
		foreach ($included as $item) {

			if ($item->type === 'roster') {

				$teams[] = [
					'teamId' => $item->attributes->stats->teamId,
					'roster' => [
						'killPoints' => 0,
						'data' => $item->relationships->participants->data
					],
					'won'        => $item->attributes->won,
					'rank'       => $item->attributes->stats->rank,
					'points'     => 0,
					'killPoints' => 0,
					'pointPlace' => GlobalConst::PointPlace[$item->attributes->stats->rank]
				];

			} elseif ($item->type === 'participant') {

				$players[] = [
					'roster_player_id' => $item->id,
					'platform'          => $item->attributes->shardId,
					'stats'             => $item->attributes->stats,
				];
			}
		}

		// ------------------------------------
		// 🔥 Сопоставление игроков командам
		// ------------------------------------
		foreach ($players as $player) {
			$rosterPlayerId = $player['roster_player_id'];

			foreach ($teams as $key => $team) {

				foreach ($team['roster']['data'] as $rosterItem) {

					if ($rosterItem->id === $rosterPlayerId) {

						$rosterItem->platform      = $player['platform'];
						$rosterItem->player_name   = $player['stats']->name;
						$rosterItem->player_kill   = $player['stats']->kills;
						$rosterItem->player_damage = $player['stats']->damageDealt;
						$rosterItem->detailed      = $player['stats'];

						$teams[$key]['killPoints'] += $rosterItem->player_kill;
					}
				}

				$teams[$key]['points'] =
					$teams[$key]['killPoints'] + $teams[$key]['pointPlace'];
			}
		}

		// ------------------------------------
		// 🔥 Формируем итоговый массив матча
		// ------------------------------------
		$timestamp  = strtotime($response->data->attributes->createdAt);
		$dateObject = new DateTime("@$timestamp");

		$matchData = [
			'map'       => GlobalConst::Map[$response->data->attributes->mapName],
			'matchType' => $response->data->attributes->matchType,
			'gameMode'  => $response->data->attributes->gameMode,
			'startInTime' => $dateObject->format('d.m.Y H:i:s') . ' GMT',
			'duration'  => round($response->data->attributes->duration / 60) . ' minute',
			'result'    => $teams
		];

		// ------------------------------------
		// 🔥 Сохраняем матч
		// ------------------------------------
		MatchsModel::create([
			'match_id'       => $matchId,
			'event_id'       => $eventId,
			'match_detailed' => json_encode($matchData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
		]);

		// ------------------------------------
		// 🔥 Сохраняем команды (без дубликатов!)
		// ------------------------------------
		foreach ($teams as $team) {

			$exists = TeamsEventModel::where([
				'event_id' => $eventId,
				'match_id' => $matchId,
				'team_lobby_number' => $team['teamId']
			])->exists();

			if (!$exists) {
				$teamName = $team['roster']['team_name'] ?? ("Team #".$team['teamId']);
				$matchId = trim($matchId);
				TeamsEventModel::create([
					'event_id'          => $eventId,
					'match_id'          => "{$matchId}",
					'team_lobby_number' => $team['teamId'],
					'team_name'         => "{$teamName}",
					'points'            => $team['points'],
					'kill_points'       => $team['killPoints'],
					'place_points'      => $team['pointPlace'],
					'detailed_info'     => json_encode($team, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
				]);

			}
		}

		return response()->json([
			'result' => $matchData,
			'cached' => false
		]);
	}


	/**
	 * Получение последнего матча пользователя
	 */
	public function getLastMatchPlayer(Request $request)
	{
		$eventId = $request->query('event_id');
		if (!$eventId) {
			return response()->json(['error' => 'event_id is required'], 422);
		}
		
		$userId = auth()->id();
		$user = User::find($userId);

		if (!$user) {
			return response()->json(['result' => []]);
		}

		$fakeReq = new Request([
			'platform' => $user->platform,
			'nickname' => $user->name
		]);

		$playerData = $this->getPlayerData($fakeReq);

		if (!$playerData || !$playerData->data) {
			return response()->json(['result' => []]);
		}

		$matchId = $playerData->data[0]->relationships->matches->data[0]->id;

		$fakeReq = new Request([
			'platform' => $user->platform,
			'matchId'  => $matchId,
			'event_id' => $eventId
		]);

		$this->getMatch($fakeReq);

		return true;
	}
}
