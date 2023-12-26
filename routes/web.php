<?php

use App\Http\Controllers\Match\MatchController;
use App\Http\Controllers\News\NewsController;
use App\Http\Controllers\Player\PlayerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Scrims\ScrimsController;
use App\Http\Controllers\Tournaments\TournamentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [NewsController::class, 'index'])->name('dashboard');
    Route::get('/news/{id?}', [NewsController::class, 'view'])->name('news');

    Route::get('/about-us', function () {
        return Inertia::render('AboutUs/AboutUs');
    })->name('about-us');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/player-stats', [PlayerController::class, 'index'])->name('player-stats');

    //Tournaments
    Route::get('/tournament/match/{id?}', [MatchController::class, 'index'])->name('tournament.match');

    Route::get('/tournament/list', [TournamentController::class, 'list'])->name('tournament.list');
    Route::get('/tournament/view/{id?}', [TournamentController::class, 'view'])->name('tournament.view');

    Route::get('/tournament/edit/{id?}', [TournamentController::class, 'edit'])->name('tournament.edit');
    Route::post('/tournament/update', [TournamentController::class, 'save'])->name('tournament.update');

    Route::get('/tournament/make', [TournamentController::class, 'make'])->name('tournament.make');
    Route::post('/tournament/create', [TournamentController::class, 'save'])->name('tournament.create');

    //Scrims
    Route::get('/scrims/list', [ScrimsController::class, 'list'])->name('scrims.list');
    Route::get('/scrims/view/{id?}', [ScrimsController::class, 'view'])->name('scrims.view');

    Route::get('/scrims/edit/{id?}', [ScrimsController::class, 'edit'])->name('scrims.edit');
    Route::post('/scrims/update', [ScrimsController::class, 'save'])->name('scrims.update');

    Route::get('/scrims/make', [ScrimsController::class, 'make'])->name('scrims.make');
    Route::post('/scrims/create', [ScrimsController::class, 'save'])->name('scrims.create');
});

require __DIR__.'/auth.php';
