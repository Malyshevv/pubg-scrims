<?php

namespace App\Http\Controllers\Directory;

use App\Http\Controllers\Controller;
use App\Models\Directions\DivisionModel;
use App\Models\Directions\StatusEventsModel;
use App\Models\Directions\TypeEventsModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DirectoryController extends Controller
{
    public function getDirectory($params)
    {
        switch ($params) {
            case 'statusEvent':
                $result = $this->getStatusEventDir();
                break;
            case 'typeEvent':
                $result = $this->getTypeEvent();
                break;
            case 'Division':
                $result = $this->getDivision();
                break;
            default:
                $statusEvent = $this->getStatusEventDir();
                $typeEvent = $this->getTypeEvent();
                $division = $this->getDivision();
                $result = [
                    'statusEvent' => $statusEvent,
                    'typeEvent' => $typeEvent,
                    'division' => $division,
                ];
                break;
        }

        return $result;
    }

    public function getStatusEventDir()
    {
        return DB::table('status_events')
            ->selectRaw('id as value, title as label')
            ->get()->toArray();
    }

    public function getDivision()
    {
        return DB::table('division')
            ->selectRaw('id as value, title as label')
            ->get()->toArray();
    }

    public function getTypeEvent()
    {
        return DB::table('type_events')
            ->selectRaw('id as value, title as label')
            ->get()->toArray();
    }
}
