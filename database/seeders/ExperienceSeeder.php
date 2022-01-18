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
            'name' => ['en' => "Level 1", 'pt' => "Nível 1"],
            'price' => 60,
            'private_price' => 80,
            'description' => [
                'en' => 'This Canyoning experience is the best for all people who want to have their first contact with this fantastic sport, through routes such as Ribeira das Cales (Funchal Ecological Park), Rochão (Camacha) or Ribeiro Frio (Santana).',
                'pt' => 'Esta experiência de Canyoning é a melhor para todas as pessoas que pretendem ter o primeiro contacto com este fantástico desporto, através de percursos como a Ribeira das Cales (Parque ecologico do Funchal), do Rochão (Camacha) ou Ribeiro Frio (Santana).'
            ],
            'activity_id' => 1,
            'level' => ['en' => 'Beginner', 'pt' => 'Iniciante'],
            'height' => ['en' => '5 to 18 meters', 'pt' => '5 a 18 metros'],
            'duration' => ['en' => 'Half Day (≤5h)', 'pt' => 'Meio Dia (≤5h)'],
        ]);

        $experience->images()->createMany([
            ['image' => '/form/n1A.webp', 'experience_id' => 1],
            ['image' => '/form/n1B.webp', 'experience_id' => 1],
            ['image' => '/form/n1C.webp', 'experience_id' => 1],
        ]);

        $experience = Experience::create([
            'name' => ['en' => "Level 2", 'pt' => "Nível 2"],
            'price' => 80,
            'private_price' => 100,
            'description' => [
                'en' => 'There are 4 places to practice level 2 canyoning, namely Ribeira do Cidrão (Curral das Freiras), Ribeira do Lajeado (Rabaçal), Ribeira do Alecrim (Rabaçal) and Ribeiro Frio (Santana).',
                'pt' => 'Existem 4 sitios para a prática do nível 2 de canyoning, nomeadamente a Ribeira do Cidrão (Curral das Freiras), Ribeira do Lajeado (Rabaçal), Ribeira do Alecrim (Rabaçal) e Ribeiro Frio (Santana).'
            ],
            'activity_id' => 1,
            'level' => ['en' => 'Intermediate', 'pt' => 'Intermédio'],
            'height' => ['en' => '5 to 25 meters', 'pt' => '5 a 25 metros'],
            'duration' => ['en' => 'Half Day (≤5h)', 'pt' => 'Meio Dia (≤5h)'],
        ]);

        $experience->images()->createMany([
            ['image' => '/form/n2A.webp', 'experience_id' => $experience->id],
            ['image' => '/form/n2B.webp', 'experience_id' => $experience->id],
            ['image' => '/form/n2C.webp', 'experience_id' => $experience->id],
            ['image' => '/form/n2D.webp', 'experience_id' => $experience->id],
        ]);


        $experience = Experience::create([
            'name' => ['en' => "Level 3", 'pt' => "Nível 3"],
            'price' => 100,
            'private_price' => 120,
            'description' => [
                'en' => 'This level already requires some previous experience in our activities and can be carried out in Ribeira Funda (Seixal), Ribeira da Furna (Santana) and Ribeira da Camisa (Ponta Delgada).',
                'pt' => 'Este nível já requer alguma experiência prévia nas nossas atividades e poderá ser realizado na Ribeira Funda (Seixal), Ribeira da Furna (Santana) e Ribeira da Camisa (Ponta Delgada).'
            ],
            'activity_id' => 1,
            'level' => ['en' => 'Difficult', 'pt' => 'Difícil'],
            'height' => ['en' => '15 to 60 meters', 'pt' => '15 a 60 metros'],
            'duration' => ['en' => 'Half Day (≤5h)', 'pt' => 'Meio Dia (≤5h)'],
        ]);

        $experience->images()->createMany([
            ['image' => '/form/n3A.webp', 'experience_id' => $experience->id],
            ['image' => '/form/n3B.webp', 'experience_id' => $experience->id],
            ['image' => '/form/n3C.webp', 'experience_id' => $experience->id],
        ]);


        $experience = Experience::create([
            'name' => ['en' => "Ribeira do Passo (São Vicente)", 'pt' => "Ribeira do Passo (São Vicente)"],
            'price' => 150,
            'private_price' => 150,
            'description' => [
                'en' => 'Level that requires a certain degree of autonomy in canyoning and experience with us in this type of activity. It can be practiced in Ribeira do Passo (São Vicente), Ribeira da Hortelã (Seixal) or Ribeira do Vimieiro (Seixal).',
                'pt' => 'Nível que necessita um dado grau de autonomia em canyoning e experiência connosco nesta tipologia de atividades. Pode ser praticado na Ribeira do Passo (São Vicente), Ribeira da Hortelã (Seixal) ou na Ribeira do Vimieiro (Seixal).'
            ],
            'activity_id' => 1,
            'level' => ['en' => 'Expert', 'pt' => 'Experiente'],
            'height' => ['en' => '50 to 60 meters', 'pt' => '50 a 60 metros'],
            'duration' => ['en' => 'Half Day (≤5h)', 'pt' => 'Meio Dia (≤5h)'],
        ]);

        $experience->images()->createMany([
            ['image' => '/form/n4A.webp', 'experience_id' => $experience->id],
            ['image' => '/form/n4B.webp', 'experience_id' => $experience->id],
            ['image' => '/form/n4C.webp', 'experience_id' => $experience->id],
        ]);

        $experience = Experience::create([
            'name' => ['en' => "Level 5", 'pt' => "Nível 5"],
            'price' => 0,
            'private_price' => 0,
            'description' => [
                'en' => 'This is the most demanding level, as it requires some technical knowledge, autonomy and good physical condition, it takes place in Lagoa do Vento e Risco (Rabaçal).',
                'pt' => 'Este é o nível mais exigente, pois necessita algum conhecimento técnico, autonomia e boa condição física, realiza-se na Lagoa do Vento e Risco (Rabaçal).'
            ],
            'activity_id' => 1,
            'level' => ['en' => 'Extreme', 'pt' => 'Extremo'],
            'height' => ['en' => '80 meters', 'pt' => '80 metros'],
            'duration' => ['en' => '3-4h', 'pt' => '3-4h'],
        ]);

        $experience->images()->createMany([
            ['image' => '/form/n5A.webp', 'experience_id' => $experience->id],
            ['image' => '/form/n5B.webp', 'experience_id' => $experience->id],
            ['image' => '/form/n5C.webp', 'experience_id' => $experience->id],
        ]);
        //----------------------------------------------------------------

        Experience::create([
            'name' => ['en' => "Sunrise", 'pt' => "Nascer do Sol"],
            'price' => 40.00,
            'private_price' => 40,
            'description' => [
                'en' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.',
                'pt' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.'
            ],
            'activity_id' => 2,
            'duration' => ['en' => '3 to 4h', 'pt' => '3 a 4h'],
        ]);
        Experience::create([
            'name' => ['en' => "Sunset", 'pt' => "Pôr do Sol"],
            'price' => 40.00,
            'private_price' => 40,
            'description' => [
                'en' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.',
                'pt' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.'
            ],
            'activity_id' => 2,
            'duration' => ['en' => '3 to 4h', 'pt' => '3 a 4h'],
        ]);
        Experience::create([
            'name' => ['en' => "Poço das Pulgas (Laurissilva)", 'pt' => "Poço das Pulgas (Laurissilva)"],
            'price' => 60.00,
            'private_price' => 60,
            'description' => [
                'en' => 'The hiking trail is located on the ridge of Ponta Delgada, located on the northern part of the Island, right in the heart os Laurissilva Forest. The route is circular, travels the hilly terrain and brooks that run along the coast of Ribeira da Camisa, through a narrow trail, with a stop at the picturesque Poço das Pulgas\' waterfall.',
                'pt' => 'O percurso situa-se na serra da Ponta Delgada, na zona norte da Ilha, em plena Floresta Laurissilva. O percurso é circular, percorre o terreno montanhoso e ribeiros que percorrem a costa da Ribeira da Camisa, por um trilho estreito, com paragem na pitoresca cascata do Poço das Pulgas.'
            ],
            'activity_id' => 2,
            'distance' => ['en' => '8500 meters', 'pt' => '8500 metros'],
            'duration' => ['en' => 'Around 4h', 'pt' => 'Cerca de 4h'],
        ]);
        Experience::create([
            'name' => ['en' => "Viewpoint of Pico do Areeiro / Pico Ruivo", 'pt' => "Miradouro do Pico do Areeiro / Pico Ruivo"],
            'price' => 70.00,
            'private_price' => 70,
            'description' => [
                'en' => 'This trail connects two of the highest peaks in Madeira (Pico Ruivo and Pico do Areeiro) . The route includes tunnels, some steep slopes and fabulous views of the central mountain massif.',
                'pt' => 'Este trilho liga dois dos picos mais altos da Madeira (Pico Ruivo e Pico do Areeiro). O percurso inclui túneis, alguns declives acentuados e paisagens fabulosas do maciço montanhoso central.'
            ],
            'activity_id' => 2,
            'distance' => ['en' => '6100 meters', 'pt' => '6100 metros'],
            'duration' => ['en' => 'Around 4h', 'pt' => 'Cerca de 4h'],
        ]);
        Experience::create([
            'name' => ['en' => "Ponta de São Lourenço", 'pt' => "Ponta de São Lourenço"],
            'price' => 40.00,
            'private_price' => 40,
            'description' => [
                'en' => 'The trail runs through Ponta de S. Lourenço, the easternmost peninsula of the island of Madeira, named after the caravel of João Gonçalves Zarco, one of the three discoverers of the island of Madeira. This peninsula is of volcanic origin, mostly basaltic, and there are also formations of limestone sediments.',
                'pt' => 'O trilho percorre a Ponta de S. Lourenço, península mais a Este da ilha da Madeira, batizada com o nome da caravela de João Gonçalves Zarco, um dos três descobridores da ilha da Madeira. Esta península é de origem vulcânica, na sua maioria basáltica, existindo também formações de sedimentos calcários.'
            ],
            'activity_id' => 2,
            'duration' => ['en' => 'Around 3h', 'pt' => 'Cerca de 3h'],
        ]);

        Experience::create([
            'name' => ['en' => "Private Tours around the Island", 'pt' => "Acompanhamento privado pela Ilha"],
            'price' => 00.00,
            'private_price' => 0,
            'description' => [
                'en' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.',
                'pt' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.'
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
