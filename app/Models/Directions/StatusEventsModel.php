<?php

namespace App\Models\Directions;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatusEventsModel extends Model
{
    use HasFactory;

    protected $table = 'status_events';
    public $incrementing = true;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'title',
        'created_at',
        'updated_at'
    ];

    protected $primaryKey = 'id';
}
