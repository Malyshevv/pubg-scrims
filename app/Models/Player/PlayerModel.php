<?php

namespace App\Models\Player;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlayerModel extends Model
{
    use HasFactory;

    protected $table = 'player';
    public $incrementing = true;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'nickname',
        'stats',
        'created_at',
        'updated_at'
    ];

    protected $primaryKey = 'id';
}
