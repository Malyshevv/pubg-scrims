<?php

namespace App\Http\Controllers\Scrims;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Event\EventController;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScrimsController extends Controller
{
    private EventController $eventController;

    public function __construct()
    {
        $this->eventController = new EventController('2');
    }

    public function list(Request $request)
    {
        $data = $this->eventController->list($request);
        return Inertia::render('Scrims/ScrimsList', ['result' => $data]);
    }

    public function view($data)
    {
        $data = $this->eventController->view($data);
        return Inertia::render('Scrims/ScrimsDetailed', ['result' => $data]);
    }

    public function edit(Request $request)
    {
        $data = $this->eventController->edit($request);
        return Inertia::render('Scrims/ScrimsEdit', ['result' => $data]);
    }

    public function make(Request $request)
    {
        return Inertia::render('Scrims/ScrimsEdit', ['result' => []]);
    }

    public function save(Request $request)
    {
        $data = $this->eventController->save($request);
        return response()->json(['result' => $data]);
    }
}
