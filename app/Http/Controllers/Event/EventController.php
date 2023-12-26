<?php

namespace App\Http\Controllers\Tournaments;

use App\Http\Controllers\Controller;
use App\Models\Events\EventsModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EventController extends Controller
{
    private $typeEvent;

    public function __construct($typeEvent)
    {
        $this->typeEvent = $typeEvent;
    }

    public function list(Request $request)
    {
        $eventTitle = $request->query('event_title');
        $divisionId = $request->query('division_id');
        $statusId = $request->query('status_id');
        $orgNickname = $request->query('org_nickname');

        return DB::table('events', 'e')
            ->selectRaw("
                e.id,
                e.title,
                e.status_id,
                e.division_id,
                d.title as division,
                se.title as status,
                (
                    select count(*) from matches m where event_id = e.id
                ) as count_match,
                e.description,
                e.maps,
                e.start_date,
                e.org_nickname,
                e.end_date
            ")
            ->leftJoin('status_events as se', 'se.id', '=', 'e.status_id')
            ->leftJoin('division as d', 'd.id', '=', 'e.division_id')
            ->where('e.type_event_id', '=', $this->typeEvent->id)
            ->when(count($eventTitle), function ($query) use ($eventTitle) {
                return $query->where('e.title', 'LIKE', '%'.$eventTitle.'%');
            })
            ->when(count($orgNickname), function ($query) use ($orgNickname) {
                return $query->where('e.org_nickname', 'LIKE', '%'.$orgNickname.'%');
            })
            ->when(count($divisionId), function ($query) use ($divisionId) {
                return $query->whereIn('e.division_id', $divisionId);
            })
            ->when(count($statusId), function ($query) use ($statusId) {
                return $query->whereIn('e.status_id', $statusId);
            })
            ->orderByDesc('e.start_date')
            ->paginate(15)
            ->withQueryString();
    }

    public function view(Request $request)
    {
        $id = $request->query('id');

        return DB::table('events', 'e')
            ->selectRaw("
                e.id,
                e.title,
                e.status_id,
                e.division_id,
                d.title as division,
                se.title as status,
                e.description,
                e.maps,
                e.start_date,
                e.org_nickname,
                e.end_date
            ")
            ->leftJoin('status_events as se', 'se.id', '=', 'e.status_id')
            ->leftJoin('division as d', 'd.id', '=', 'e.division_id')
            ->where('e.type_event_id', '=', $this->typeEvent->id)
            ->where('e.id', '=', $id)
            ->first();
    }

    public function edit(Request $request)
    {
        $id = $request->query('id');
        $user = Auth::user();

        return DB::table('events', 'e')
            ->selectRaw("
                e.id,
                e.title,
                e.status_id,
                e.division_id,
                d.title as division,
                se.title as status,
                e.description,
                e.maps,
                e.start_date,
                e.org_nickname,
                e.end_date
            ")
            ->leftJoin('status_events as se', 'se.id', '=', 'e.status_id')
            ->leftJoin('division as d', 'd.id', '=', 'e.division_id')
            ->where('e.type_event_id', '=', $this->typeEvent->id)
            ->where('e.id', '=', $id)
            ->where('e.user_id', '=', $user->id)
            ->first();
    }

    public function save(Request $request)
    {
        $user = Auth::user();
        $type = $request->post('type');
        $id = $request->post('id');
        $title = $request->post('title');
        $status_id = $request->post('status_id');
        $division_id = $request->post('division_id');
        $description = $request->post('description');
        $start_date = $request->post('start_date');
        $end_date = $request->post('end_date');
        $orgNickname = $request->post('org_nickname');

        if ($type === 'update') {
            $find = DB::table('events', 'e')->where('e.id', '=' , $id)->first();
            $find->title = $title ?? $find->title;
            $find->status_id = $status_id ?? $find->status_id;
            $find->division_id = $division_id ?? $find->division_id;
            $find->description = $description ?? $find->description;
            $find->start_date = $start_date ?? $find->start_date;
            $find->end_date = $end_date ?? $find->end_date;
            $find->org_nickname = $orgNickname ?? $find->org_nickname;
            $find->updated_at = date('Y-m-d H:i:s');
            if ($find->save()) {
                return true;
            }
        } else if ($type === 'create') {
            $save = EventsModel::insertGetId([
                'title' => $title,
                'status_id' => $status_id,
                'division_id' => $division_id,
                'description' => $description,
                'start_date' => $start_date,
                'end_date' => $end_date,
                'org_nickname' => $orgNickname,
                'user_id' => $user->id,
                'type_event_id' => $this->typeEvent->id,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]);

            if ($save) {
                return true;
            }
        }
        return false;
    }
}
