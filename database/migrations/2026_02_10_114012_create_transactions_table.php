<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->decimal("amount", 8, 2);
            $table->date("date");
            $table->integer("n_clients")->default(0);
            $table->text("description")->nullable();
            $table->unsignedBigInteger("transaction_partner_id")->nullable();
            $table->unsignedBigInteger("transaction_category_id");
            $table->unsignedBigInteger("transaction_sub_category_id");
            $table->unsignedBigInteger("user_id")->nullable();
            $table->unsignedBigInteger("tracker_id");
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('transaction_sub_category_id')->references('id')->on('transaction_sub_categories')->onDelete('cascade');
            $table->foreign('transaction_category_id')->references('id')->on('transaction_categories')->onDelete('cascade');
            $table->foreign('transaction_partner_id')->references('id')->on('transaction_partners')->onDelete('set null');
            $table->foreign('tracker_id')->references('id')->on('trackers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
}
