<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('experience_id');
            $table->boolean('private')->default(false);
            $table->boolean('confirmation')->default(false);
            $table->string('confirmation_token')->unique();
            $table->string('name');
            $table->string('email');
            $table->string('address');
            $table->integer('people');
            $table->text('notes')->nullable();
            $table->string('phone')->nullable();
            $table->date('date');
            $table->time('time')->default("08:00:00");
            $table->timestamps();

            $table->foreign('experience_id')->references('id')->on('experiences');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservations');
    }
}
