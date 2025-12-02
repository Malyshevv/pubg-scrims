<?php

use App\Http\Controllers\Api\ApiAuthController;
use App\Http\Controllers\PUBG\Match\ApiPUBGFetchMatchController;
use App\Http\Controllers\PUBG\Player\PlayerLifeTimeStatsController;
use App\Http\Controllers\PUBG\Player\PlayerRankedStatsController;
use App\Http\Controllers\PUBG\Player\PlayerStatsController;
use App\Http\Controllers\PUBG\Seasons\SeasonsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('token', [ApiAuthController::class, 'requestToken']);

Route::middleware('auth:sanctum')->get('get-match', [ApiPUBGFetchMatchController::class, 'getMatch'])->name('get-match');

Route::get('get-player-ranked-stats', [PlayerRankedStatsController::class, 'getPlayerRankedStats'])->name('get-player-ranked-stats');
Route::get('get-player-data', [PlayerStatsController::class, 'getPlayerData'])->name('get-player-data');
Route::middleware('auth:sanctum')->get('get-player-lifetime-stats', [PlayerLifeTimeStatsController::class, 'getPlayerLifeTimeStats'])->name('get-player-lifetime-stats');

Route::middleware('auth:sanctum')->get('get-seasons-list', [SeasonsController::class, 'getSeasonsAll'])->name('get-seasons-list');
