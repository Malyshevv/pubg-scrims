<?php

namespace App\Http\Controllers\Scrims;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Directory\DirectoryController;
use App\Http\Controllers\Event\EventController;
use App\Models\Matchs\MatchsModel;
use App\Models\Teams\TeamsEventModel;
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
		$id = $data;
		
        $data = $this->eventController->view($id);
		
	    $teams = TeamsEventModel::where('event_id', $id)
		    ->orderByDesc('points')
		    ->get();

	    $matches = MatchsModel::where('event_id', $id)
		    ->orderByDesc('created_at')
		    ->get();
		
	    return Inertia::render('Scrims/ScrimsDetailed', [
		    'auth' => [
			    'user' => auth()->user(),
		    ],
		    'result' => [
			    'id'            => $data->id,
			    'title'         => $data->title,
			    'description'   => $data->description,
			    'start_date'    => $data->start_date,
			    'end_date'      => $data->end_date,
			    'maps'          => $data->maps,
			    'division'      => $data->division,
			    'org_nickname'  => $data->org_nickname,
			    'telegram_link' => $data->telegram_link,
			    'discord_link'  => $data->discord_link,
			    'status_id'     => $data->status_id,
			    'status'        => $data->status ?? '',
			    'user_id'       => $data->user_id,

			    // Новые поля
			    'teams'         => $teams,
			    'matches'       => $matches,
		    ]
	    ]);
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
