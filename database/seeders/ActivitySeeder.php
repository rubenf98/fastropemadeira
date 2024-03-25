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
            'name' => ['en' => "Canyoning", 'pt' => "Canyoning", 'fr' => "Canyoning", 'de' => "Canyoning"],
            'description' => [
                'en' => "Progressive exploration of a river, overcoming obstacles, through various techniques, equipment and specialized monitoring by our specialists",
                'pt' => "Exploração progressiva de um rio, transpondo os obstáculos, através de diversas técnicas, equipamentos e acompanhamento especializado dos nossos especialistas",
                'fr' => 'Exploration progressive d\'une rivière, franchissement d\'obstacles, grâce à diverses techniques, équipements et suivi spécialisé par nos spécialistes',
                'de' => 'Fortschrittliche Erkundung eines Flusses, Überwindung von Hindernissen durch verschiedene Techniken, Ausrüstung und spezielle Überwachung durch unsere Spezialisten'
            ],
            'image' => "/canyoning.webp"
        ]);

        Activity::create([
            'name' => ['en' => "Hiking", 'pt' => "Caminhada", 'fr' => "Randonnée", 'de' => "Wandern"],
            'description' => [
                'en' => "Dare to explore our walks through fantastic routes full of local nature. We have options for all tastes and customized packages that will amaze you!",
                'pt' => "Atreve-te a explorar as nossas caminhadas através de percursos fantásticos e repletos de natureza. Temos opções para todos os gostos e pacotes personalizados!",
                'fr' => 'Osez explorer nos promenades à travers des itinéraires fantastiques pleins de nature locale. Nous avons des options pour tous les goûts et des forfaits personnalisés qui vous étonneront!',
                'de' => 'Wagen Sie es, unsere Spaziergänge auf fantastischen Routen voller lokaler Natur zu erkunden. Wir haben Optionen für jeden Geschmack und maßgeschneiderte Pakete, die Sie begeistern werden!'
            ],
            'image' => "/hiking.webp"
        ]);
    }
}
