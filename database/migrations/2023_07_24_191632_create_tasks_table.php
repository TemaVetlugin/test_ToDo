<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->unsignedSmallInteger('user_id');
            $table->unsignedSmallInteger('folder_id')->nullable();
            $table->timestamps();

            $table->index('user_id', 'task_user_idx');
            $table->foreign('user_id','task_user_idx')->on('users')->references('id');

            $table->index('folder_id', 'task_folder_idx');
            $table->foreign('folder_id','task_folder_idx')->on('folders')->references('id');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
};
