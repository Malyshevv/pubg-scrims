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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->unsignedBigInteger('division_id');
            $table->unsignedBigInteger('status_id');
            $table->unsignedBigInteger('type_event_id');
            $table->string('description');
            $table->string('maps');
            $table->string('org_nickname');
            $table->unsignedBigInteger('user_id');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->string('discord_link');
            $table->string('telegram_link');
            $table->timestamps();

            $table->foreign('division_id')->references('id')->on('division');
            $table->foreign('status_id')->references('id')->on('status_events');
            $table->foreign('type_event_id')->references('id')->on('type_events');

            $table->index(['title']);
            $table->index(['division_id']);
            $table->index(['status_id']);
            $table->index('maps');
            $table->index(['start_date','end_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
