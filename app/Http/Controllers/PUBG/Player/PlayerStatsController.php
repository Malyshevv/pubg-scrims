<?php

namespace App\Http\Controllers\PUBG\Player;

use App\Http\Controllers\Controller;
use App\Http\Controllers\PUBG\ApiPUBGController;
use Illuminate\Http\Request;

class PlayerStatsController extends ApiPUBGController
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

    public function getPlayerData(Request $request) {
        $this->validateParams($request, $this->messages, $this->rules);

        $platform = $request->query('platform');
        $nickname = $request->query('nickname');
        $apiKey = $request->query('api_key');

        $url = "$this->url/$platform/players?filter[playerNames]=$nickname";

        $result = $this->curlSend($url, $apiKey);
        return response()->json(['result' => $result]);
    }
}
