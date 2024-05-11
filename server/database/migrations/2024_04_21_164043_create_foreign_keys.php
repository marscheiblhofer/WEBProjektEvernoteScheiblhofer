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
        Schema::table('notelists', function (Blueprint $table) {
            $table->foreignId('creator_id')->constrained('users')->onDelete('cascade');
        });

        Schema::table('notes', function (Blueprint $table) {
            $table->foreignId('notelist_id')->constrained()->onDelete('cascade');
        });

        Schema::table('todos', function (Blueprint $table) {
            $table->foreignId('notelist_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('note_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('responsible_person_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->foreignId('creator_id')->constrained('users')->onDelete('cascade');
        });

        Schema::table('images', function (Blueprint $table) {
            $table->foreignId('note_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('todo_id')->nullable()->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('notelists', function (Blueprint $table) {
            $table->dropConstrainedForeignId('creator_id');
        });

        Schema::table('notes', function (Blueprint $table) {
            $table->dropConstrainedForeignId('notelist_id');
        });

        Schema::table('todos', function (Blueprint $table) {
            $table->dropConstrainedForeignId('notelist_id');
            $table->dropConstrainedForeignId('note_id');
            $table->dropConstrainedForeignId('responsible_person_id');
        });

        Schema::table('images', function (Blueprint $table) {
            $table->dropConstrainedForeignId('note_id');
            $table->dropConstrainedForeignId('todo_id');
        });
    }
};
