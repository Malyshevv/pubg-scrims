<?php

namespace App\Models\Matchs;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MatchsModel extends Model
{
    use HasFactory;
	
	protected $table = 'matches';
	public $incrementing = true;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'id',
		'match_id',
		'event_id',
		'match_detailed',
		'created_at',
		'updated_at'
	];

	protected $casts = [
		'match_detailed' => 'array',
	];

	protected $primaryKey = 'id';
}
