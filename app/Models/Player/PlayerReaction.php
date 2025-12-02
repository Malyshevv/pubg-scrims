<?php

namespace App\Models\Player;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlayerReaction extends Model
{
    use HasFactory;

	protected $table = 'player_reactions';
	public $incrementing = true;
	
	
	protected $fillable = ['from_user_id', 'to_user_id', 'type'];

	protected $primaryKey = 'id';
}
