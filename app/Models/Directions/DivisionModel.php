<?php

namespace App\Models\Directions;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DivisionModel extends Model
{
    use HasFactory;

    protected $table = 'division';
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
