<?php

namespace App\Http\Controllers\Player;

use App\Http\Controllers\Controller;
use App\Models\Player\PlayerReaction;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlayerTopController extends Controller
{
	public function index(Request $request)
	{
		$players = User::where('isShowTable', true)
			->where('is_blocked', false)
			->where('is_deleted', false)
			->select('id', 'name as nickname', 'platform', 'contacts')
			->get();

		$rankedController = app(\App\Http\Controllers\PUBG\Player\PlayerRankedStatsController::class);

		$resultPlayers = [];

		for ($i = 0; $i < count($players); ++$i) {

			$player = $players[$i];
			$fakeRequest = new Request([
				'platform' => $player->platform,
				'nickname' => $player->nickname,
			]);
			
			$response = $rankedController->getPlayerRankedStats($fakeRequest);
			$rankedData = $response->getData(true);

			$rankedJson = $rankedData['result'] ?? null;
			$ranked = json_decode($rankedJson, true);

			$resultPlayers[] = [
				'id'       => $player->id,
				'nickname' => $player->nickname,
				'platform' => $player->platform,
				'ranked'   => $ranked,
				'reactions' => [
					'pro'    => PlayerReaction::where('to_user_id', $player->id)->where('type', 'pro')->count(),
					'noob'   => PlayerReaction::where('to_user_id', $player->id)->where('type', 'noob')->count(),
					'report' => PlayerReaction::where('to_user_id', $player->id)->where('type', 'report')->count(),
				]
			];

		}
		
		
		return Inertia::render('Player/PlayerTop', [
			'players' => $resultPlayers
		]);
	}


	public function add(Request $request)
	{
		$request->validate([
			'nickname' => 'required|string|max:255',
			'contact'  => 'required|string|max:255',
			'platform' => 'required|string|max:50',
		]);

		$user = $request->user();
		
		$user->update([
			'name'     => $request->nickname,
			'platform' => $request->platform,
			'contacts'  => $request->contact,
			'isShowTable' => true,
		]);

		return response()->json(['status' => 'ok']);
	}

}
