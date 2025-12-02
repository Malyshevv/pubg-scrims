<?php

namespace App\Models\Teams;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamsEventModel extends Model
{
    use HasFactory;

    protected $table = 'teams_event';
    public $incrementing = true;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'event_id',
        'team_lobby_number',
        'team_name',
        'points',
	    'match_id',
        'kill_points',
        'place_points',
        'detailed_info',
        'created_at',
        'updated_at'
    ];

    protected $primaryKey = 'id';
}
