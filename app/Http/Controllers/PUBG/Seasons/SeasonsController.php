<?php

namespace App\Http\Controllers\PUBG\Seasons;

use App\Http\Controllers\Controller;
use App\Http\Controllers\PUBG\ApiPUBGController;
use Illuminate\Http\Request;

class SeasonsController extends ApiPUBGController
{
    public array $messages = [
        'platform.required' => 'Поле platform является обязательным для заполнения',
        'api_key.required' => 'Поле api_key является обязательным для заполнения',
    ];
    public array $rules = [
        'platform' => 'required',
        'api_key' => 'required',
    ];

    public function getSeasonsAll(Request $request) {
        $this->validateParams($request, $this->messages, $this->rules);

        $platform = $request->query('platform');
        $apiKey = $request->query('api_key');

        $url = "$this->url/$platform/seasons";
	    return json_decode($this->curlSend($url, $apiKey));
    }
}
