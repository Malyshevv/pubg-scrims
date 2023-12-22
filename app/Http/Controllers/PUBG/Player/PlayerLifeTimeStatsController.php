<?php

namespace App\Http\Controllers\PUBG\Player;

use App\Http\Controllers\PUBG\ApiPUBGController;
use Illuminate\Http\Request;

class PlayerLifeTimeStatsController extends ApiPUBGController
{
    public array $messages = [
        'platform.required' => 'Поле platform является обязательным для заполнения',
        'api_key.required' => 'Поле api_key является обязательным для заполнения',
        'accountID.required' => 'Поле type является обязательным для заполнения'
    ];
    public array $rules = [
        'platform' => 'required',
        'api_key' => 'required',
        'accountID' => 'required'
    ];

    public function getPlayerLifeTimeStats(Request $request)
    {
        $this->validateParams($request, $this->messages, $this->rules);

        $platform = $request->query('platform');
        $apiKey = $request->query('api_key');
        $accountID = $request->query('accountID');

        $url = "$this->url/$platform/players/$accountID/seasons/lifetime";

        $result = $this->curlSend($url, $apiKey);
        return response()->json(['result' => $result]);
    }
}
