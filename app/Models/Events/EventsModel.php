<?php

namespace App\Models\Events;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventsModel extends Model
{
    use HasFactory;

    protected $table = 'events';
    public $incrementing = true;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'title',
        'division_id',
        'status_id',
        'type_event_id',
        'description',
        'maps',
        'start_date',
        'end_date',
        'discord_link',
        'telegram_link',
        'org_nickname',
        'created_at',
        'updated_at'
    ];

    protected $primaryKey = 'id';
}
