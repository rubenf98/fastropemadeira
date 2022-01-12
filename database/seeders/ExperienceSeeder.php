<?php

namespace Database\Seeders;

use App\Models\Experience;
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
        //

        Experience::create([
            'name' => ['en' => "Ribeira das Cales", 'pt' => "Ribeira das Cales"],
            'price' => 60,
            'private_price' => 80,
            'description' => [
                'en' => 'Canyoning in Ribeira das Cales starts at “Chão da Lagoa” in Funchal Ecological Park at about 1500 meters of altitude. Along the way we find 5 rappels and to overcome the obstacles of nature we need to walk, abseil, swim and jump in beautiful lakes and waterfalls. This Canyoning experience is the best for everyone who wants to have their first contact with this fantastic sport.',
                'pt' => 'O Canyoning na Ribeira das Cales começa no “Chão da Lagoa” no Parque Ecológico do Funchal a cerca de 1500 metros de altitude. Ao longo do percurso encontramos 5 rapéis e para superar os obstáculos da natureza precisamos caminhar, fazer rapel, nadar e pular em belos lagos e cachoeiras. Esta experiência de Canyoning é a melhor para todas as pessoas que pretendem ter o primeiro contacto com este fantástico desporto.'
            ],
            'image' => "/form/n1A.webp",
            'activity_id' => 1,
            'level' => ['en' => 'Beginner', 'pt' => 'Iniciante'],
            'height' => ['en' => '12 meters', 'pt' => '12 metros'],
            'duration' => ['en' => 'Half Day (≤5h)', 'pt' => 'Meio Dia (≤5h)'],
        ]);

        Experience::create([
            'name' => ['en' => "Ribeira do Rochão", 'pt' => "Ribeira do Rochão"],
            'price' => 60,
            'private_price' => 80,
            'description' => [
                'en' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.',
                'pt' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.'
            ],
            'image' => "/form/n1B.webp",
            'activity_id' => 1,
            'level' => ['en' => 'Beginner', 'pt' => 'Iniciante'],
            'height' => ['en' => '5 to 15 meters', 'pt' => '5 a 15 metros'],
            'duration' => ['en' => 'Half Day (≤5h)', 'pt' => 'Meio Dia (≤5h)'],
        ]);
        Experience::create([
            'name' => ['en' => "Ribeiro Frio", 'pt' => "Ribeiro Frio"],
            'price' => 60,
            'private_price' => 80,
            'description' => [
                'en' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.',
                'pt' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.'
            ],
            'image' => "/form/n1C.webp",
            'activity_id' => 1,
            'level' => ['en' => 'Beginner', 'pt' => 'Iniciante'],
            'height' => ['en' => '18 meters', 'pt' => '18 metros'],
            'duration' => ['en' => 'Half Day (≤5h)', 'pt' => 'Meio Dia (≤5h)'],
        ]);
        Experience::create([
            'name' => ['en' => "Ribeira do Cidrão (Curral das Freiras)", 'pt' => "Ribeira do Cidrão (Curral das Freiras)"],
            'price' => 80,
            'private_price' => 100,
            'description' => [
                'en' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.',
                'pt' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.'
            ],
            'image' => "/form/n2A.webp",
            'activity_id' => 1,
            'level' => ['en' => 'Intermediate', 'pt' => 'Intermédio'],
            'height' => ['en' => '5 to 15 meters', 'pt' => '5 a 15 metros'],
            'duration' => ['en' => '3 to 4 hours', 'pt' => '3 a 4 horas'],
        ]);
        Experience::create([
            'name' => ['en' => "Ribeira do Cidrão (Rabaçal)", 'pt' => "Ribeira do Cidrão (Rabaçal)"],
            'price' => 80,
            'private_price' => 100,
            'description' => [
                'en' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.',
                'pt' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.'
            ],
            'image' => "/form/n2B.webp",
            'activity_id' => 1,
            'level' => ['en' => 'Intermediate', 'pt' => 'Intermédio'],
            'height' => ['en' => '5 to 15 meters', 'pt' => '5 a 15 metros'],
            'duration' => ['en' => 'Half Day (≤5h)', 'pt' => 'Meio Dia (≤5h)'],
        ]);
        Experience::create([
            'name' => ['en' => "Ribeira do Alecrim", 'pt' => "Ribeira do Alecrim"],
            'price' => 80,
            'private_price' => 100,
            'description' => [
                'en' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.',
                'pt' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.'
            ],
            'image' => "/form/n2C.webp",
            'activity_id' => 1,
            'level' => ['en' => 'Intermediate', 'pt' => 'Intermédio'],
            'height' => ['en' => '5 to 15 meters', 'pt' => '5 a 15 metros'],
            'duration' => ['en' => 'Half Day (≤5h)', 'pt' => 'Meio Dia (≤5h)'],
        ]);
        Experience::create([
            'name' => ['en' => "Ribeiro Frio (Santana)", 'pt' => "Ribeiro Frio (Santana)"],
            'price' => 80,
            'private_price' => 100,
            'description' => [
                'en' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.',
                'pt' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.'
            ],
            'image' => "/form/n2D.webp",
            'activity_id' => 1,
            'level' => ['en' => 'Intermediate', 'pt' => 'Intermédio'],
            'height' => ['en' => '5 to 15 meters', 'pt' => '5 a 15 metros'],
            'duration' => ['en' => 'Half Day (≤5h)', 'pt' => 'Meio Dia (≤5h)'],
        ]);
        Experience::create([
            'name' => ['en' => "Ribeira Funda", 'pt' => "Ribeira Funda"],
            'price' => 100,
            'private_price' => 120,
            'description' => [
                'en' => 'Canyoning Ribeira Funda is an excellent canyoning in Madeira for those looking for the first contact with large waterfalls. In addition to the spectacular waterfall with a height of 60 meters, this route also has some incredible jumps.',
                'pt' => 'O Canyoning Ribeira Funda é um excelente canyoning na Madeira para quem procura os primeiros contactos com grandes cascatas. Além da espetacular cachoeira com 60 metros de altura, esse percurso também conta com alguns saltos incríveis.'
            ],
            'image' => "/form/n3A.webp",
            'activity_id' => 1,
            'level' => ['en' => 'Difficult', 'pt' => 'Difícil'],
            'height' => ['en' => '60 meters', 'pt' => '60 metros'],
            'duration' => ['en' => 'Half Day (≤5h)', 'pt' => 'Meio Dia (≤5h)'],
        ]);
        Experience::create([
            'name' => ['en' => "Ribeira da Furna (Santana)", 'pt' => "Ribeira da Furna (Santana)"],
            'price' => 100,
            'private_price' => 120,
            'description' => [
                'en' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.',
                'pt' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.'
            ],
            'image' => "/form/n3B.webp",
            'activity_id' => 1,
            'level' => ['en' => 'Difficult', 'pt' => 'Difícil'],
            'height' => ['en' => '5 to 15 meters', 'pt' => '5 a 15 metros'],
            'duration' => ['en' => 'Half Day (≤5h)', 'pt' => 'Meio Dia (≤5h)'],
        ]);
        Experience::create([
            'name' => ['en' => "Ribeira da Camisa (Ponta Delgada)", 'pt' => "Ribeira da Camisa (Ponta Delgada)"],
            'price' => 100,
            'private_price' => 120,
            'description' => [
                'en' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.',
                'pt' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.'
            ],
            'image' => "/form/n3C.webp",
            'activity_id' => 1,
            'level' => ['en' => 'Difficult', 'pt' => 'Difícil'],
            'height' => ['en' => '5 to 15 meters', 'pt' => '5 a 15 metros'],
            'duration' => ['en' => 'Half Day (≤5h)', 'pt' => 'Meio Dia (≤5h)'],
        ]);
        Experience::create([
            'name' => ['en' => "Ribeira do Passo (São Vicente)", 'pt' => "Ribeira do Passo (São Vicente)"],
            'price' => 150,
            'private_price' => 150,
            'description' => [
                'en' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.',
                'pt' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.'
            ],
            'image' => "/form/n4A.webp",
            'activity_id' => 1,
            'level' => ['en' => 'Expert', 'pt' => 'Experiente'],
            'height' => ['en' => '5 to 15 meters', 'pt' => '5 a 15 metros'],
            'duration' => ['en' => 'Half Day (≤5h)', 'pt' => 'Meio Dia (≤5h)'],
        ]);
        Experience::create([
            'name' => ['en' => "Ribeira da Hortelã (Seixal)", 'pt' => "Ribeira da Hortelã (Seixal)"],
            'price' => 150,
            'private_price' => 150,
            'description' => [
                'en' => 'Canyoning in Ribeira Hortelã is one of the most emblematic canyoning on Madeira Island and one of the must-see canyons for true lovers of this fantastic water sport.',
                'pt' => 'O Canyoning na Ribeira Hortelã é um dos canyoning mais emblemáticos da Ilha da Madeira e um dos canyons obrigatórios para os verdadeiros amantes deste fantástico desporto aquático.'
            ],
            'image' => "/form/n4B.webp",
            'activity_id' => 1,
            'level' => ['en' => 'Expert', 'pt' => 'Experiente'],
            'height' => ['en' => '60 meters', 'pt' => '60 metros'],
            'duration' => ['en' => 'Half Day (≤5h)', 'pt' => 'Meio Dia (≤5h)'],
        ]);

        Experience::create([
            'name' => ['en' => "Ribeira do Vimieiro (Seixal)", 'pt' => "Ribeira do Vimieiro (Seixal)"],
            'price' => 150,
            'private_price' => 150,
            'description' => [
                'en' => 'Ribeira do Vimieiro is a very vertical canyon with beautiful and large waterfalls. Unlike most of the canyons in Madeira, this one is made up of several successive waterfalls that make us descend about 300 meters of unevenness in just 500 meters in length.',
                'pt' => 'A Ribeira do Vimieiro é um desfiladeiro muito vertical com belas e grandes cascatas. Ao contrário da maioria dos desfiladeiros da Madeira, este é constituído por várias e sucessivas cascatas que nos fazem descer cerca de 300 metros de desnível em apenas 500 metros de comprimento.'
            ],
            'image' => "/form/n4C.webp",
            'activity_id' => 1,
            'level' => ['en' => 'Expert', 'pt' => 'Experiente'],
            'height' => ['en' => '60 meters', 'pt' => '60 metros'],
            'duration' => ['en' => 'Half Day (≤5h)', 'pt' => 'Meio Dia (≤5h)'],
        ]);

        Experience::create([
            'name' => ['en' => "Lagoa do Vento e Risco (Rabaçal)", 'pt' => "Lagoa do Vento e Risco (Rabaçal)"],
            'price' => 150,
            'private_price' => 150,
            'description' => [
                'en' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.',
                'pt' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.'
            ],
            'image' => "/form/n5A.webp",
            'activity_id' => 1,
            'level' => ['en' => 'Extreme', 'pt' => 'Extremo'],
            'height' => ['en' => '80 meters', 'pt' => '80 metros'],
            'duration' => ['en' => ' 3-4h', 'pt' => '3-4h'],
        ]);
        //----------------------------------------------------------------

        Experience::create([
            'name' => ['en' => "Sunrise", 'pt' => "Nascer do Sol"],
            'price' => 40.00,
            'description' => [
                'en' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.',
                'pt' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.'
            ],
            'image' => "/form/h1.webp",
            'activity_id' => 2,
            'distance' => ['en' => '1000 meters', 'pt' => '1000 metros'],
            'duration' => ['en' => '3 to 4h', 'pt' => '3 a 4h'],
        ]);
        Experience::create([
            'name' => ['en' => "Sunset", 'pt' => "Pôr do Sol"],
            'price' => 40.00,
            'description' => [
                'en' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.',
                'pt' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.'
            ],
            'image' => "/form/h2.webp",
            'activity_id' => 2,
            'distance' => ['en' => '5430 meters', 'pt' => '5430 metros'],
            'duration' => ['en' => 'Half Day (≤5h)', 'pt' => 'Meio Dia (≤5h)'],
        ]);
        Experience::create([
            'name' => ['en' => "Poço das Pulgas (Laurissilva)", 'pt' => "Poço das Pulgas (Laurissilva)"],
            'price' => 60.00,
            'description' => [
                'en' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.',
                'pt' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.'
            ],
            'image' => "/form/h3.webp",
            'activity_id' => 2,
            'distance' => ['en' => '5430 meters', 'pt' => '5430 metros'],
            'duration' => ['en' => 'Half Day (≤5h)', 'pt' => 'Meio Dia (≤5h)'],
        ]);
        Experience::create([
            'name' => ['en' => "Viewpoint of Pico do Areeiro / Pico Ruivo", 'pt' => "Miradouro do Pico do Areeiro / Pico Ruivo"],
            'price' => 70.00,
            'description' => [
                'en' => 'This trail connects two of the highest peaks in Madeira (Pico Ruivo and Pico do Areeiro) . The route includes tunnels, some steep slopes and fabulous views of the central mountain massif.',
                'pt' => 'Este trilho liga dois dos picos mais altos da Madeira (Pico Ruivo e Pico do Areeiro). O percurso inclui túneis, alguns declives acentuados e paisagens fabulosas do maciço montanhoso central.'
            ],
            'image' => "/form/h4.webp",
            'activity_id' => 2,
            'distance' => ['en' => '6100 meters', 'pt' => '6100 metros'],
            'duration' => ['en' => '3-4h', 'pt' => '3-4h'],
        ]);
        Experience::create([
            'name' => ['en' => "Ponta de São Lourenço", 'pt' => "Ponta de São Lourenço"],
            'price' => 40.00,
            'description' => [
                'en' => 'The trail runs through Ponta de S. Lourenço, the easternmost peninsula of the island of Madeira, named after the caravel of João Gonçalves Zarco, one of the three discoverers of the island of Madeira. This peninsula is of volcanic origin, mostly basaltic, and there are also formations of limestone sediments.',
                'pt' => 'O trilho percorre a Ponta de S. Lourenço, península mais a Este da ilha da Madeira, batizada com o nome da caravela de João Gonçalves Zarco, um dos três descobridores da ilha da Madeira. Esta península é de origem vulcânica, na sua maioria basáltica, existindo também formações de sedimentos calcários.'
            ],
            'image' => "/form/h5.webp",
            'activity_id' => 2,
            'distance' => ['en' => '6000 meters', 'pt' => '6000 metros'],
            'duration' => ['en' => '2-3h', 'pt' => '2-3h'],
        ]);

        Experience::create([
            'name' => ['en' => "Private Tours around the Island", 'pt' => "Acompanhamento privado pela Ilha"],
            'price' => 00.00,
            'description' => [
                'en' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.',
                'pt' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta repellendus alias consequuntur voluptate magni impedit rerum minima nobis dolore, quisquam sint excepturi temporibus incidunt a eveniet ducimus neque nemo.'
            ],
            'image' => "/form/h6.webp",
            'activity_id' => 2,
        ]);
    }
}
