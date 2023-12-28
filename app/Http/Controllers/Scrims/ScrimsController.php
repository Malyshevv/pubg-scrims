<?php

namespace App\Http\Controllers\Scrims;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Directory\DirectoryController;
use App\Http\Controllers\Event\EventController;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScrimsController extends Controller
{
    private EventController $eventController;
    private DirectoryController $directoryController;

    public function __construct()
    {
        $this->directoryController = new DirectoryController();
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
        $dir = $this->directoryController->getDirectory(null);
        $data = $this->eventController->edit($request);
        return Inertia::render('Scrims/ScrimsEdit', ['result' => $data, 'dir' => $dir]);
    }

    public function make(Request $request)
    {
        $dir = $this->directoryController->getDirectory(null);
        return Inertia::render('Scrims/ScrimsEdit', ['result' => [], 'dir' => $dir]);
    }

    public function save(Request $request)
    {
        $data = $this->eventController->save($request);
        return response()->json(['result' => $data]);
    }
}
