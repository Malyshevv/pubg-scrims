<?php

namespace App\Http\Controllers\Player;

use App\Http\Controllers\Controller;
use App\Models\Player\PlayerReaction;
use Illuminate\Http\Request;

class PlayerReactionController extends Controller
{
	public function toggle(Request $request)
	{
		$request->validate([
			'player_id' => 'required|integer|exists:users,id',
			'type'      => 'required|in:pro,noob,report',
		]);

		$from = auth()->id();
		$to   = $request->player_id;
		
		if ($from == $to) {
			return response()->json(['error' => 'self'], 400);
		}

		$existing = PlayerReaction::where([
			'from_user_id' => $from,
			'to_user_id'   => $to,
			'type'         => $request->type,
		])->first();
		
		if ($existing) {
			$existing->delete();
		} else {
			PlayerReaction::create([
				'from_user_id' => $from,
				'to_user_id'   => $to,
				'type'         => $request->type,
			]);
		}
		
		return response()->json([
			'pro'    => PlayerReaction::where('to_user_id', $to)->where('type', 'pro')->count(),
			'noob'   => PlayerReaction::where('to_user_id', $to)->where('type', 'noob')->count(),
			'report' => PlayerReaction::where('to_user_id', $to)->where('type', 'report')->count(),
		]);
	}
}

