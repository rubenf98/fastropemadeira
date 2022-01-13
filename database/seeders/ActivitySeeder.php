<?php

namespace Database\Seeders;

use App\Models\Activity;
use Illuminate\Database\Seeder;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Activity::create([
            'name' => ['en' => "Canyoning", 'pt' => "Canyoning"],
            'description' => [
                'en' => "Progressive exploration of a river, overcoming obstacles, through various techniques, equipment and specialized monitoring by our specialists",
                'pt' => "Exploração progressiva de um rio, transpondo os obstáculos, através de diversas técnicas, equipamentos e acompanhamento especializado dos nossos especialistas"
            ],
            'image' => "/canyoning.webp"
        ]);

        Activity::create([
            'name' => ['en' => "Hiking", 'pt' => "Caminhada"],
            'description' => [
                'en' => "Dare to explore our walks through fantastic routes full of local nature. We have options for all tastes and customized packages that will amaze you!",
                'pt' => "Atreve-te a explorar as nossas caminhadas através de percursos fantásticos e repletos de natureza. Temos opções para todos os gostos e pacotes personalizados!"
            ],
            'image' => "/hiking.webp"
        ]);
    }
}
