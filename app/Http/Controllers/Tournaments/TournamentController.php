<?php

namespace App\Http\Controllers\Tournaments;

use App\Http\Controllers\Controller;
use App\Models\Events\EventsModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TournamentController extends Controller
{
    private EventController $eventController;

    public function __construct()
    {
        $this->eventController = new EventController('Tournament');
    }

    public function list(Request $request)
    {
        $data = $this->eventController->list($request);
        return Inertia::render('Tournaments/TournamentsList', ['result' => $data]);
    }

    public function view(Request $request)
    {
        $data = $this->eventController->view($request);
        return Inertia::render('Tournaments/TournamentDetailed', ['result' => $data]);
    }

    public function edit(Request $request)
    {
        $data = $this->eventController->edit($request);
        return Inertia::render('Tournaments/TournamentEdit', ['result' => $data]);
    }

    public function make(Request $request)
    {
        return Inertia::render('Tournaments/TournamentEdit', ['result' => []]);
    }

    public function save(Request $request)
    {
        $data = $this->eventController->save($request);
        return response()->json(['result' => $data]);
    }
}
