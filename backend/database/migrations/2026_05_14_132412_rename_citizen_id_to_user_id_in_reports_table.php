<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('reports')->truncate();
        Schema::table('reports', function (Blueprint $table) {
            $table->dropForeign(['citizen_id']);
            $table->renameColumn('citizen_id', 'user_id');
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->renameColumn('user_id', 'citizen_id');
            $table->foreign('citizen_id')->references('id')->on('citizens')->cascadeOnDelete();
        });
    }
};
