<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExperiencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('age')->nullable();
            $table->decimal('price', 5, 2);
            $table->decimal('private_price', 5, 2)->nullable();
            $table->unsignedBigInteger('activity_id');
            $table->text('description');
            $table->boolean('priority')->default(false);
            $table->string('video')->nullable();
            $table->string('target')->nullable();
            $table->string('level')->nullable();
            $table->string('distance')->nullable();
            $table->string('height')->nullable();
            $table->string('duration')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('activity_id')->references('id')->on('activities');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('experiences');
    }
}
