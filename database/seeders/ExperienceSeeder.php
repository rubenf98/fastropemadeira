<?php

namespace Database\Seeders;

use App\Models\Experience;
use App\Models\ExperienceImage;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $experience = Experience::create([
            'name' => ['en' => "beginner", 'pt' => "Principiante", 'fr' => 'Débutant', 'de' => 'Anfänger'],
            'price' => 60,
            'private_price' => 80,
            'video' => "https://www.youtube.com/embed/w-Upj6l7KR8",
            'description' => [
                'en' => 'This Canyoning experience is the best for all people who want to have their first contact with this fantastic sport, through routes such as Ribeira das Cales (Funchal Ecological Park), Rochão (Camacha) or Ribeiro Frio (Santana).',
                'pt' => 'Esta experiência de Canyoning é a melhor para todas as pessoas que pretendem ter o primeiro contacto com este fantástico desporto, através de percursos como a Ribeira das Cales (Parque ecologico do Funchal), do Rochão (Camacha) ou Ribeiro Frio (Santana).',
                'fr' => 'Cette expérience de canyoning est la meilleure pour tous ceux qui souhaitent avoir leur premier contact avec ce sport fantastique, à travers des itinéraires tels que Ribeira das Cales (Parc écologique de Funchal), Rochão (Camacha) ou Ribeiro Frio (Santana).',
                'de' => 'Dieses Canyoning-Erlebnis ist das Beste für alle, die ihren ersten Kontakt mit diesem fantastischen Sport auf Routen wie Ribeira das Cales (Funchal Ecological Park), Rochão (Camacha) oder Ribeiro Frio (Santana) haben möchten.'
            ],
            'activity_id' => 1,
            'target' => ['en' => 'Family', 'pt' => 'Familia', 'fr' => 'Famille', 'de' => 'Familie'],
            'level' => ['en' => 'Beginner', 'pt' => 'Iniciante', 'fr' => 'Débutant', 'de' => 'Initiator'],
            'height' => ['en' => '5 to 18 meters', 'pt' => '5 a 18 metros', 'fr' => '5 à 18 mètres', 'de' => '5 bis 18 Meter'],
            'duration' => ['en' => '2-3h', 'pt' => '2-3h', 'fr' => '2-3h', 'de' => '2-3h'],
        ]);

        $experience->images()->createMany([
            ['image' => '/images/activities/beginner.jpg', 'experience_id' => $experience->id],
            ['image' => '/form/n1A.webp', 'experience_id' => 1],
            ['image' => '/form/n1B.webp', 'experience_id' => 1],
            ['image' => '/form/n1C.webp', 'experience_id' => 1],
        ]);

        $experience = Experience::create([
            'name' => ['en' => "adventure", 'pt' => "Aventura", 'fr' => 'Aventure', 'de' => 'Abenteuer'],
            'price' => 80,
            'private_price' => 100,
            'target' => ['en' => 'Family', 'pt' => 'Familia'],
            'video' => "https://www.youtube.com/embed/jUxO_yq7Vdk",
            'description' => [
                'en' => 'There are 4 places to practice level 2 canyoning, namely Ribeira do Cidrão (Curral das Freiras), Ribeira do Lajeado (Rabaçal), Ribeira do Alecrim (Rabaçal) and Ribeiro Frio (Santana).',
                'pt' => 'Existem 4 sitios para a prática do nível 2 de canyoning, nomeadamente a Ribeira do Cidrão (Curral das Freiras), Ribeira do Lajeado (Rabaçal), Ribeira do Alecrim (Rabaçal) e Ribeiro Frio (Santana).',
                'fr' => 'Il existe 4 endroits pour pratiquer le canyoning de niveau 2, à savoir Ribeira do Cidrão (Curral das Freiras), Ribeira do Lajeado (Rabaçal), Ribeira do Alecrim (Rabaçal) et Ribeiro Frio (Santana).',
                'de' => 'Es gibt 4 Orte, an denen man Canyoning der Stufe 2 üben kann, nämlich Ribeira do Cidrão (Curral das Freiras), Ribeira do Lajeado (Rabaçal), Ribeira do Alecrim (Rabaçal) und Ribeiro Frio (Santana).'
            ],
            'activity_id' => 1,
            'level' => ['en' => 'Intermediate', 'pt' => 'Intermédio', 'fr' => 'Intermédiaire', 'de' => 'Dazwischenliegend'],
            'height' => ['en' => '5 to 25 meters', 'pt' => '5 a 25 metros', 'fr' => '5 à 25 mètres', 'de' => '5 bis 25 Meter'],
            'duration' => ['en' => '2-3h', 'pt' => '2-3h', 'fr' => '2-3h', 'de' => '2-3h'],
        ]);

        $experience->images()->createMany([
            ['image' => '/images/activities/adventure.jpg', 'experience_id' => $experience->id],
            ['image' => '/form/n2A.webp', 'experience_id' => $experience->id],
            ['image' => '/form/n2B.webp', 'experience_id' => $experience->id],
            ['image' => '/form/n2C.webp', 'experience_id' => $experience->id],
            ['image' => '/form/n2D.webp', 'experience_id' => $experience->id],
        ]);


        $experience = Experience::create([
            'name' => ['en' => "advanced", 'pt' => "Avançado", 'fr' => 'Avancé', 'de' => 'Fortschrittlich'],
            'price' => 120,
            'private_price' => 120,
            'target' => ['en' => 'Adventurous', 'pt' => 'Aventureiros'],
            'video' => "https://www.youtube.com/embed/5diVXzfUfqg",
            'description' => [
                'en' => 'This level already requires some previous experience in our activities and can be carried out in Ribeira Funda (Seixal), Ribeira da Furna (Santana) and Ribeira da Camisa (Ponta Delgada).',
                'pt' => 'Este nível já requer alguma experiência prévia nas nossas atividades e poderá ser realizado na Ribeira Funda (Seixal), Ribeira da Furna (Santana) e Ribeira da Camisa (Ponta Delgada).',
                'fr' => 'Ce niveau nécessite déjà une certaine expérience préalable dans nos activités et peut être réalisé à Ribeira Funda (Seixal), Ribeira da Furna (Santana) et Ribeira da Camisa (Ponta Delgada).',
                'de' => 'Dieses Niveau erfordert bereits einige Vorkenntnisse in unseren Aktivitäten und kann in Ribeira Funda (Seixal), Ribeira da Furna (Santana) und Ribeira da Camisa (Ponta Delgada) durchgeführt werden.'
            ],
            'activity_id' => 1,
            'level' => ['en' => 'Difficult', 'pt' => 'Difícil', 'fr' => 'Difficile', 'de' => 'Schwierig'],
            'height' => ['en' => '15 to 60 meters', 'pt' => '15 a 60 metros', 'fr' => '15 à 60 mètres', 'de' => '15 bis 60 Meter'],
            'duration' => ['en' => '≤5h', 'pt' => '≤5h', 'fr' => '≤5h', 'de' => '≤5h'],
        ]);

        $experience->images()->createMany([
            ['image' => '/images/activities/advanced.jpg', 'experience_id' => $experience->id],
            ['image' => '/form/n3A.webp', 'experience_id' => $experience->id],
            ['image' => '/form/n3B.webp', 'experience_id' => $experience->id],
            ['image' => '/form/n3C.webp', 'experience_id' => $experience->id],
        ]);


        $experience = Experience::create([
            'name' => ['en' => "extreme", 'pt' => "Extremo", 'fr' => 'Extrême', 'de' => 'Extrem'],
            'price' => 200,
            'private_price' => 200,
            'target' => ['en' => 'Experienced', 'pt' => 'Experientes'],
            'video' => "https://www.youtube.com/embed/AI5X2f9Y3Rc",
            'description' => [
                'en' => 'Level that requires a certain degree of autonomy in canyoning and experience with us in this type of activity. It can be practiced in Ribeira do Passo (São Vicente), Ribeira da Hortelã (Seixal) or Ribeira do Vimieiro (Seixal).',
                'pt' => 'Nível que necessita um dado grau de autonomia em canyoning e experiência connosco nesta tipologia de atividades. Pode ser praticado na Ribeira do Passo (São Vicente), Ribeira da Hortelã (Seixal) ou na Ribeira do Vimieiro (Seixal).',
                'fr' => 'Niveau qui nécessite une certaine autonomie en canyoning et une expérience avec nous dans ce type d\'activité. Il peut être pratiqué à Ribeira do Passo (São Vicente), Ribeira da Hortelã (Seixal) ou Ribeira do Vimieiro (Seixal).',
                'de' => 'Level that requires a certain degree of autonomy in canyoning and experience with us in this type of activity. It can be practiced in Ribeira do Passo (São Vicente), Ribeira da Hortelã (Seixal) or Ribeira do Vimieiro (Seixal).'
            ],
            'activity_id' => 1,
            'level' => ['en' => 'Expert', 'pt' => 'Experiente', 'fr' => 'Expert', 'de' => 'Experte'],
            'height' => ['en' => '50 to 60 meters', 'pt' => '50 a 60 metros', 'fr' => '50 à 60 mètres', 'de' => '50 bis 60 Meter'],
            'duration' => ['en' => '≤5h', 'pt' => '≤5h', 'fr' => '≤5h', 'de' => '≤5h'],
        ]);

        $experience->images()->createMany([
            ['image' => '/images/activities/extreme.jpg', 'experience_id' => $experience->id],
            ['image' => '/form/n4A.webp', 'experience_id' => $experience->id],
            ['image' => '/form/n4B.webp', 'experience_id' => $experience->id],
            ['image' => '/form/n4C.webp', 'experience_id' => $experience->id],
        ]);

        $experience = Experience::create([
            'name' => ['en' => "Level 5", 'pt' => "Nível 5", 'fr' => 'Niveau 5', 'de' => 'Level 5'],
            'price' => 0,
            'private_price' => 0,
            'description' => [
                'en' => 'This is the most demanding level, as it requires some technical knowledge, autonomy and good physical condition, it takes place in Lagoa do Vento e Risco (Rabaçal).',
                'pt' => 'Este é o nível mais exigente, pois necessita algum conhecimento técnico, autonomia e boa condição física, realiza-se na Lagoa do Vento e Risco (Rabaçal).',
                'fr' => 'C\'est le niveau le plus exigeant, car il nécessite des connaissances techniques, de l\'autonomie et une bonne condition physique, il se déroule à Lagoa do Vento e Risco (Rabaçal).',
                'de' => 'Dies ist das anspruchsvollste Niveau, da es einige technische Kenntnisse, Autonomie und eine gute körperliche Verfassung erfordert. Es findet in Lagoa do Vento e Risco (Rabaçal) statt.'
            ],
            'activity_id' => 1,
            'level' => ['en' => 'Extreme', 'pt' => 'Extremo', 'fr' => '', 'de' => ''],
            'height' => ['en' => '80 meters', 'pt' => '80 metros', 'fr' => '', 'de' => ''],
            'duration' => ['en' => '3-4h', 'pt' => '3-4h', 'fr' => '3-4h', 'de' => '3-4h'],
        ]);

        $experience->images()->createMany([
            ['image' => '/form/n5A.webp', 'experience_id' => $experience->id],
            ['image' => '/form/n5B.webp', 'experience_id' => $experience->id],
            ['image' => '/form/n5C.webp', 'experience_id' => $experience->id],
        ]);
        //----------------------------------------------------------------

        Experience::create([
            'name' => ['en' => "Sunrise", 'pt' => "Nascer do Sol", 'fr' => 'Lever du soleil', 'de' => 'Sonnenaufgang'],
            'price' => 40.00,
            'private_price' => 40,
            'description' => [
                'en' => 'Come and enjoy the famous sunrise of Madeira Island! We have several privileged locations for this practice to create magical moments in your life.',
                'pt' => 'Venha desfrutar do tão famoso nascer do sol da Ilha da Madeira! Temos várias localizações previligiadas para esta prática de modo a criar momento mágicos na sua vida.',
                'fr' => 'Venez profiter du célèbre lever de soleil de l\'île de Madère ! Nous disposons de plusieurs lieux privilégiés pour cette pratique afin de créer des moments magiques dans votre vie.',
                'de' => 'Kommen Sie und genießen Sie den berühmten Sonnenaufgang der Insel Madeira! Wir verfügen über mehrere privilegierte Orte für diese Praxis, um magische Momente in Ihrem Leben zu schaffen.'
            ],
            'activity_id' => 2,
            'duration' => ['en' => '3 to 4h', 'pt' => '3 a 4h', 'fr' => '3 à 4h', 'de' => '3 bis 4 Stunden'],
        ]);
        Experience::create([
            'name' => ['en' => "Sunset", 'pt' => "Pôr do Sol", 'fr' => 'Coucher de soleil', 'de' => 'Sonnenuntergang'],
            'price' => 40.00,
            'private_price' => 40,
            'description' => [
                'en' => 'Come and enjoy the famous sunset of Madeira Island! We have several privileged locations for this practice to create magical moments in your life.',
                'pt' => 'Venha desfrutar do tão famoso pôr do sol da Ilha da Madeira! Temos várias localizações previligiadas para esta prática de modo a criar momento mágicos na sua vida.',
                'fr' => 'Venez profiter du célèbre coucher de soleil de l\'île de Madère ! Nous disposons de plusieurs lieux privilégiés pour cette pratique afin de créer des moments magiques dans votre vie.',
                'de' => 'Kommen Sie und genießen Sie den berühmten Sonnenuntergang der Insel Madeira! Wir verfügen über mehrere privilegierte Orte für diese Praxis, um magische Momente in Ihrem Leben zu schaffen.'
            ],
            'activity_id' => 2,
            'duration' => ['en' => '3 to 4h', 'pt' => '3 a 4h', 'fr' => '3 à 4h', 'de' => '3 bis 4 Stunden'],
        ]);
        Experience::create([
            'name' => ['en' => "Poço das Pulgas (Laurissilva)", 'pt' => "Poço das Pulgas (Laurissilva)", 'fr' => 'Poço das Pulgas (Laurissilva)', 'de' => 'Poço das Pulgas (Laurissilva)'],
            'price' => 60.00,
            'private_price' => 60,
            'description' => [
                'en' => 'The hiking trail is located on the ridge of Ponta Delgada, located on the northern part of the Island, right in the heart os Laurissilva Forest. The route is circular, travels the hilly terrain and brooks that run along the coast of Ribeira da Camisa, through a narrow trail, with a stop at the picturesque Poço das Pulgas\' waterfall.',
                'pt' => 'O percurso situa-se na serra da Ponta Delgada, na zona norte da Ilha, em plena Floresta Laurissilva. O percurso é circular, percorre o terreno montanhoso e ribeiros que percorrem a costa da Ribeira da Camisa, por um trilho estreito, com paragem na pitoresca cascata do Poço das Pulgas.',
                'fr' => 'Le sentier de randonnée est situé sur la crête de Ponta Delgada, dans la partie nord de l\'île, en plein cœur de la forêt de Laurissilva. L\'itinéraire est circulaire et parcourt le terrain vallonné et les ruisseaux qui longent la côte de Ribeira da Camisa, à travers un sentier étroit, avec un arrêt à la pittoresque cascade de Poço das Pulgas.',
                'de' => 'Der Wanderweg befindet sich auf dem Bergrücken von Ponta Delgada im nördlichen Teil der Insel, mitten im Herzen des Laurissilva-Waldes. Die Route ist kreisförmig und führt über einen schmalen Pfad durch hügeliges Gelände und Bäche, die entlang der Küste von Ribeira da Camisa verlaufen, mit einem Halt am malerischen Wasserfall Poço das Pulgas.'
            ],
            'activity_id' => 2,
            'distance' => ['en' => '8500 meters', 'pt' => '8500 metros', 'fr' => '8500 mètres', 'de' => '8500 Meter'],
            'duration' => ['en' => 'Around 4h', 'pt' => 'Cerca de 4h', 'fr' => 'Environ 4h', 'de' => 'Etwa 4 Stunden'],
        ]);
        Experience::create([
            'name' => ['en' => "Viewpoint of Pico do Areeiro / Pico Ruivo", 'pt' => "Miradouro do Pico do Areeiro / Pico Ruivo", 'fr' => 'Point de vue Pico do Areeiro / Pico Ruivo', 'de' => 'Standpunkt Pico do Areeiro / Pico Ruivo'],
            'price' => 70.00,
            'private_price' => 70,
            'description' => [
                'en' => 'This trail connects two of the highest peaks in Madeira (Pico Ruivo and Pico do Areeiro) . The route includes tunnels, some steep slopes and fabulous views of the central mountain massif.',
                'pt' => 'Este trilho liga dois dos picos mais altos da Madeira (Pico Ruivo e Pico do Areeiro). O percurso inclui túneis, alguns declives acentuados e paisagens fabulosas do maciço montanhoso central.',
                'fr' => 'Ce sentier relie deux des plus hauts sommets de Madère (Pico Ruivo et Pico do Areeiro) . Le parcours comprend des tunnels, des pentes raides et des vues fabuleuses sur le massif montagneux central.',
                'de' => 'Dieser Weg verbindet zwei der höchsten Gipfel Madeiras (Pico Ruivo und Pico do Areeiro). Die Route beinhaltet Tunnel, einige steile Hänge und herrliche Ausblicke auf das Zentralgebirgsmassiv.'
            ],
            'activity_id' => 2,
            'distance' => ['en' => '6100 meters', 'pt' => '6100 metros', 'fr' => '6100 mètres', 'de' => '6100 Meter'],
            'duration' => ['en' => 'Around 4h', 'pt' => 'Cerca de 4h', 'fr' => 'Environ 4h', 'de' => 'Etwa 4 Stunden'],
        ]);
        Experience::create([
            'name' => ['en' => "Ponta de São Lourenço", 'pt' => "Ponta de São Lourenço", 'fr' => 'Ponta de São Lourenço', 'de' => 'Ponta de São Lourenço'],
            'price' => 40.00,
            'private_price' => 40,
            'description' => [
                'en' => 'The trail runs through Ponta de S. Lourenço, the easternmost peninsula of the island of Madeira, named after the caravel of João Gonçalves Zarco, one of the three discoverers of the island of Madeira. This peninsula is of volcanic origin, mostly basaltic, and there are also formations of limestone sediments.',
                'pt' => 'O trilho percorre a Ponta de S. Lourenço, península mais a Este da ilha da Madeira, batizada com o nome da caravela de João Gonçalves Zarco, um dos três descobridores da ilha da Madeira. Esta península é de origem vulcânica, na sua maioria basáltica, existindo também formações de sedimentos calcários.',
                'fr' => 'Le sentier traverse Ponta de S. Lourenço, la péninsule la plus orientale de l\'île de Madère, du nom de la caravelle de João Gonçalves Zarco, l\'un des trois découvreurs de l\'île de Madère. Cette péninsule est d\'origine volcanique, majoritairement basaltique, et on y trouve également des formations de sédiments calcaires.',
                'de' => 'Der Weg verläuft durch Ponta de S. Lourenço, die östlichste Halbinsel der Insel Madeira, benannt nach der Karavelle von João Gonçalves Zarco, einem der drei Entdecker der Insel Madeira. Diese Halbinsel ist vulkanischen Ursprungs, größtenteils basaltisch, und es gibt auch Formationen aus Kalksteinsedimenten.'
            ],
            'activity_id' => 2,
            'duration' => ['en' => 'Around 3h', 'pt' => 'Cerca de 3h', 'fr' => 'Environ 3h', 'de' => 'Etwa 3 Stunden'],
        ]);

        Experience::create([
            'name' => ['en' => "Private Tours around the Island", 'pt' => "Acompanhamento privado pela Ilha", 'fr' => 'Visites privées autour de l\'île', 'de' => 'Private Touren rund um die Insel'],
            'price' => 00.00,
            'private_price' => 0,
            'description' => [
                'en' => 'Contact us about your dream destinations and activities on the island and we will take care of them! We will accompany and provide all the necessary support to get to know the island in the best possible way.',
                'pt' => 'Contacte-nos relativamente aos seus destinos e atividades de sonhos na ilha que nós trataremos de os realizar! Iremos acompanhar e fornecer todo o apoio necessário para conhecer a ilha da melhor forma possível.',
                'fr' => 'Contactez-nous pour connaître vos destinations et activités de rêve sur l\'île et nous nous en occuperons ! Nous accompagnerons et fournirons tout le soutien nécessaire pour connaître l\'île de la meilleure façon possible.',
                'de' => 'Kontaktieren Sie uns bezüglich Ihrer Traumziele und Aktivitäten auf der Insel und wir kümmern uns darum! Wir begleiten Sie und geben Ihnen die nötige Unterstützung, um die Insel bestmöglich kennenzulernen'
            ],
            'activity_id' => 2,
        ]);

        ExperienceImage::create(
            ['image' => '/form/h1.webp', 'experience_id' => 6],

        );
        ExperienceImage::create(
            ['image' => '/form/h2.webp', 'experience_id' => 7],

        );
        ExperienceImage::create(
            ['image' => '/form/h3.webp', 'experience_id' => 8],

        );
        ExperienceImage::create(
            ['image' => '/form/h4.webp', 'experience_id' => 9],

        );
        ExperienceImage::create(
            ['image' => '/form/h5.webp', 'experience_id' => 10],

        );
        ExperienceImage::create(
            ['image' => '/form/h6.webp', 'experience_id' => 11],

        );
    }
}
