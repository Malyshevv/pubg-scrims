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
		Schema::table('users', function (Blueprint $table) {
			$table->text('platform')->default('');
			$table->bigInteger('report')->default(0);
			$table->bigInteger('bot')->default(0);
			$table->bigInteger('god_player')->default(0);
			$table->boolean('is_blocked')->default(false);
			$table->boolean('is_deleted')->default(false);
		});
	}
	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::table('users', function (Blueprint $table) {
			$table->dropColumn('platform');
			$table->dropColumn('report');
			$table->dropColumn('bot');
			$table->dropColumn('god_player');
			$table->dropColumn('is_blocked');
			$table->dropColumn('is_deleted');
		});
	}
};