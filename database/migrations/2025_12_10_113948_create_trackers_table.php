<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateTrackersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trackers', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->decimal("value", 8, 2);
            $table->timestamps();
        });

        DB::table('trackers')->insert([
            'name' => 'total_balance',
            'value' => 0.00,
        ]);

        DB::table('trackers')->insert([
            'name' => 'income',
            'value' => 0.00,
        ]);

        DB::table('trackers')->insert([
            'name' => 'expense',
            'value' => 0.00,
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('trackers');
    }
}
