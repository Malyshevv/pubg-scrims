<?php

namespace App\Http\Controllers\Event;

use App\Http\Controllers\Controller;
use App\Models\Events\EventsModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
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
                e.discord_link,
                e.telegram_link,
                e.end_date
            ")
            ->leftJoin('status_events as se', 'se.id', '=', 'e.status_id')
            ->leftJoin('division as d', 'd.id', '=', 'e.division_id')
            ->where('e.type_event_id', '=', $this->typeEvent)
            ->when(!empty($eventTitle), function ($query) use ($eventTitle) {
                return $query->where('e.title', 'LIKE', '%'.$eventTitle.'%');
            })
            ->when(!empty($orgNickname), function ($query) use ($orgNickname) {
                return $query->where('e.org_nickname', 'LIKE', '%'.$orgNickname.'%');
            })
            ->when(!empty($divisionId), function ($query) use ($divisionId) {
                return $query->whereIn('e.division_id', $divisionId);
            })
            ->when(!empty($statusId), function ($query) use ($statusId) {
                return $query->whereIn('e.status_id', $statusId);
            })
            ->orderByDesc('e.start_date')
            ->paginate(15)
            ->withQueryString();
    }

    public function view($id)
    {
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
                e.discord_link,
                e.telegram_link,
                e.end_date
            ")
            ->leftJoin('status_events as se', 'se.id', '=', 'e.status_id')
            ->leftJoin('division as d', 'd.id', '=', 'e.division_id')
            ->where('e.type_event_id', '=', $this->typeEvent)
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
                e.discord_link,
                e.telegram_link,
                e.maps,
                e.start_date,
                e.org_nickname,
                e.end_date
            ")
            ->leftJoin('status_events as se', 'se.id', '=', 'e.status_id')
            ->leftJoin('division as d', 'd.id', '=', 'e.division_id')
            ->where('e.type_event_id', '=', $this->typeEvent)
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
        $discordLink = $request->post('discord_link');
        $telegramLink = $request->post('telegram_link');
        $maps = $request->post('maps');

        if (isset($maps) && !empty($maps)) {
            $newMaps = '';
            foreach ($maps as $key => $item) {
                $newMaps .= $key === 0 ? $item['title'] : '/'.$item['title'];
            }
        }

        if ($type === 'update') {
            $messages = [
                'id.required' => 'field id is required',
                'id.min' => 'title id min length is :min symbol',
            ];

            $rules = [
                'id' => 'required|min:1',
            ];

            $this->validate($request, $rules, $messages);

            $find = DB::table('events', 'e')->where('e.id', '=' , $id)->first();
            $find->title = $title ?? $find->title;
            $find->status_id = $status_id ?? $find->status_id;
            $find->division_id = $division_id ?? $find->division_id;
            $find->description = $description ?? $find->description;
            $find->start_date = $start_date ?? $find->start_date;
            $find->end_date = $end_date ?? $find->end_date;
            $find->org_nickname = $orgNickname ?? $find->org_nickname;
            $find->discord_link = $discordLink ?? $find->discord_link;
            $find->telegram_link = $telegramLink ?? $find->telegram_link;
            $find->maps = $maps ?? $find->maps;
            $find->updated_at = date('Y-m-d H:i:s');
            if ($find->save()) {
                return true;
            }
        } else if ($type === 'create') {
            $messages = [
                'title.required' => 'field title is required',
                'title.min' => 'title field min length is :min symbol',

                'status_id.required' => 'field status is required',
                'status_id.min' => 'status field min length is:min symbol',

                'division_id.required' => 'field tier is required',
                'division_id.min' => 'tier field min length is :min symbol',

                'description.required' => 'field description is required',
                'description.min' => 'description field min length is :min symbol',

                'start_date.required' => 'field start date is required',
                'start_date.min' => 'start date field min length is :min symbol',

                'end_date.required' => 'field end date is required',
                'end_date.min' => 'end_date date field min length is :min symbol',

                'org_nickname.required' => 'field org_nickname is required',
                'org_nickname.min' => 'org nickname field min length :min symbol',

                'maps.required' => 'field maps is required',
                'maps.min' => 'maps field min length :min symbol',
            ];

            $rules = [
                'title' => 'required|min:3',
                'status_id' => 'required|min:1',
                'division_id' => 'required|min:1',
                'description' => 'required|min:5',
                'start_date' => 'required|min:10',
                'end_date' => 'required|min:10',
                'org_nickname' => 'required|min:4',
                'maps' => 'required'
            ];

            $this->validate($request, $rules, $messages);

            $save = EventsModel::insertGetId([
                'title' => $title,
                'status_id' => $status_id,
                'maps' => $newMaps,
                'division_id' => $division_id,
                'description' => $description,
                'start_date' => $start_date,
                'end_date' => $end_date,
                'org_nickname' => $orgNickname,
                'user_id' => $user->id,
                'discord_link' => $discordLink,
                'telegram_link' => $telegramLink,
                'type_event_id' => $this->typeEvent,
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
