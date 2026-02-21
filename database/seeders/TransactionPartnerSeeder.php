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

        TransactionPartner::create([
            'name' => 'Madeira outdoors',
        ]);

        TransactionPartner::create([
            'name' => 'Lido Tours',
        ]);

        TransactionPartner::create([
            'name' => 'Rebecca Kiosk',
        ]);

        TransactionPartner::create([
            'name' => 'Happy Tours',
        ]);
    }
}
