<?php

namespace App\Http\Controllers\PUBG\Match;

use App\Http\Controllers\Controller;
use App\Http\Controllers\PUBG\ApiPUBGController;
use App\Utils\GlobalConst;
use DateTime;
use Illuminate\Http\Request;

class ApiPUBGFetchMatchController extends ApiPUBGController
{
    public array $messages = [
        'platform.required' => 'Поле platform является обязательным для заполнения',
        'api_key.required' => 'Поле api_key является обязательным для заполнения',
        'matchId.required' => 'Поле type является обязательным для заполнения'
    ];
    public array $rules = [
        'platform' => 'required',
        'api_key' => 'required',
        'matchId' => 'required',
    ];

    public function getMatch(Request $request) {
        $this->validateParams($request, $this->messages, $this->rules);

        $platform = $request->query('platform');
        $apiKey = $request->query('api_key');
        $matchId = $request->query('matchId');

        $url = "$this->url/$platform/matches/$matchId";
        $result = $this->curlSend($url, $apiKey);

        $result = $result ? json_decode($result) : null;

        $teams = [];
        $players = [];
        $included = $result->included;

        foreach ($included as $item) {
            if ($item->type == 'roster') {
                $teams[] = [
                    'teamId' => $item->attributes->stats->teamId,
                    'roster' => [
                        'killPoints' => 0,
                        'data' => $item->relationships->participants->data
                    ],
                    'won' => $item->attributes->won,
                    'rank' => $item->attributes->stats->rank,
                    'points' => 0,
                    'killPoints' => 0,
                    'pointPlace' => GlobalConst::PointPlace[$item->attributes->stats->rank]
                ];
            } else if ($item->type == 'participant') {
                $players[] = [
                    'roster_player_id' => $item->id,
                    'platform' => $item->attributes->shardId,
                    'stats' => $item->attributes->stats,
                ];
            }
        }

        foreach ($players as $player) {
            $playerRosterId = $player['roster_player_id'];
            foreach ($teams as $key => $teamsItem) {
                $roster = $teamsItem['roster']['data'];
                foreach ($roster as $rosterItem) {
                    if ($rosterItem->id == $playerRosterId) {
                        $rosterItem->platform = $player['platform'];
                        $rosterItem->player_name = $player['stats']->name;
                        $rosterItem->player_kill = $player['stats']->kills;
                        $rosterItem->player_damage = $player['stats']->damageDealt;
                        $rosterItem->detailed = $player['stats'];
                        $teams[$key]['killPoints'] = $teams[$key]['killPoints'] ? $rosterItem->player_kill + $teams[$key]['killPoints']  : $rosterItem->player_kill;
                    }
                }

                $teams[$key]['points'] = $teams[$key]['killPoints'] + $teams[$key]['pointPlace'];
            }
        }


        $timestamp = strtotime($result->data->attributes->createdAt);
        $dateObject = new DateTime("@$timestamp");
        $dateSt = $dateObject->format('d.m.Y H:i:s');

        $result = [
            'map' => GlobalConst::Map[$result->data->attributes->mapName],
            'matchType' => $result->data->attributes->matchType,
            'gameMode' => $result->data->attributes->gameMode,
            'startInTime' => $dateSt . ' GMT',
            'duration' => round($result->data->attributes->duration / 60) .' minute',
            'result' => $teams
        ];
        return response()->json(['result' => $result]);
    }

}
