<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('player_reactions', function (Blueprint $table) {
	        $table->id();
	        $table->foreignId('from_user_id')->constrained('users')->onDelete('cascade');
	        $table->foreignId('to_user_id')->constrained('users')->onDelete('cascade');

	        $table->enum('type', ['pro', 'noob', 'report']);

	        $table->timestamps();

	        // 1 реакция каждого типа на 1 пользователя
	        $table->unique(['from_user_id', 'to_user_id', 'type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('player_reactions');
    }
};
