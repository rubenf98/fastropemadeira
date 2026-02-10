<?php

namespace Database\Seeders;

use App\Models\TransactionPartner;
use Illuminate\Database\Seeder;

class TransactionPartnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TransactionPartner::create([
            'name' => 'Aleksandra',
        ]);

        TransactionPartner::create([
            'name' => 'Albano Aktiv',
        ]);

        TransactionPartner::create([
            'name' => 'Discovery',
        ]);
    }
}
