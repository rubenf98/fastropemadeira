<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionSubCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transaction_sub_categories', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->unsignedBigInteger("transaction_category_id");
            $table->timestamps();

            $table->foreign('transaction_category_id')->references('id')->on('transaction_categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transaction_sub_categories');
    }
}
