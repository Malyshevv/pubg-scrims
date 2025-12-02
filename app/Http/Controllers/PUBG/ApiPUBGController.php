<?php

namespace App\Http\Controllers\PUBG;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ApiPUBGController extends Controller
{
    public string $url;

    public function __construct()
    {
        $this->url = 'https://api.pubg.com/shards';
    }

	public function getPlayerData(Request $request)
	{
		$request->validate([
			'platform' => 'required|string',
			'nickname' => 'required|string',
		]);

		$platform = $request->platform;
		$playerName = $request->nickname;
		
		$url = "{$this->url}/{$platform}/players?filter[playerNames]={$playerName}";
		
		return json_decode($this->curlSend($url));
	}


	public function curlSend($data, $apiKey = null)  {
        $apiKey = $apiKey ?? "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1ZmVlYmE1MC02YTc3LTAxMzctODQ3Yi0wNjM3YmE0NjRkYzgiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTU5ODE4NDY2LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii04YjZiMjIwMC1kZDcyLTQ5ZGItOTBmMi0zOGIxNTM1NDllMTIifQ.hf6SnccDxaux0mTXH72eyoFkvGfSDZUzH6ho-kHg7Qw";
        $curl_header = array(
            'Content-Type: application/json',
            'Authorization: Bearer '.$apiKey,
            'Accept: application/vnd.api+json'
        );
        $initCurl = curl_init($data);
        curl_setopt($initCurl, CURLOPT_HTTPHEADER, $curl_header);
        curl_setopt($initCurl, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($initCurl);
        curl_close($initCurl);

        return $result;
    }

    public function validateParams(Request $request, array $rules, array $messages = [])
    {
        return $request->validate($rules, $messages);
    }
}
