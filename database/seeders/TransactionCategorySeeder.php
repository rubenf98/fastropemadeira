<?php

namespace Database\Seeders;

use App\Models\TransactionCategory;
use App\Models\TransactionSubCategory;
use Illuminate\Database\Seeder;

class TransactionCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            ['image' => '/icon/mobile/transaction_categories/activity.svg', "name" => "Atividades", "subcategories" => [
                ["name" => "Canyoning"],
                ["name" => "Sunset"],
                ["name" => "Outros"],
                ["name" => "Reembolso"],
            ]],
            ['image' => '/icon/mobile/transaction_categories/equipment.svg', "name" => "Equipamento", "subcategories" => [
                ["name" => "Manutenção"],
                ["name" => "Aquisição"],
                ["name" => "Material descartável"],
                ["name" => "Aluguer"],
                ["name" => "Venda"],
                ["name" => "Uniformes"],
            ]],
            ['image' => '/icon/mobile/transaction_categories/transport.svg', "name" => "Transporte/Logística", "subcategories" => [
                ["name" => "Transfers de Clientes"],
                ["name" => "Manutenção de Viaturas"],
                ["name" => "Combustível"],
                ["name" => "Seguros de Viaturas"],
                ["name" => "Aluguer de Viaturas"],
                ["name" => "Transporte de Equipamento"],
            ]],
            ['image' => '/images/activities/beginner.jpg', "name" => "Recursos Humanos", "subcategories" => [
                ["name" => "Salários"],
                ["name" => "Formação"],
                ["name" => "Prémios / Incentivos"],
                ["name" => "Serviços Externos"],
            ]],
            ['image' => '/images/activities/beginner.jpg', "name" => "Infraestrutura & Operações", "subcategories" => [
                ["name" => "Aluguer de Espaço / Armazém"],
                ["name" => "Manutenção Geral das Instalações"],
                ["name" => "Limpeza"],
                ["name" => "Eletricidade, Água, etc."],
                ["name" => "Armazenamento / Gestão de Stock"],
                ["name" => "Contabilidade"],
                ["name" => "Taxas Bancárias"],
                ["name" => "Serviços Jurídicos / Consultoria"],
            ]],
            ['image' => '/images/activities/beginner.jpg', "name" => "Marketing, Vendas & Parcerias", "subcategories" => [
                ["name" => "Publicidade"],
                ["name" => "Redes Sociais"],
                ["name" => "Website"],
                ["name" => "Comissões de Agências / Hotéis / Operadores"],
                ["name" => "Parcerias Comerciais"],
                ["name" => "Vouchers / Promoções / Gift Cards"],
            ]],

            ['image' => '/images/activities/beginner.jpg', "name" => "Seguros e Licenças", "subcategories" => [
                ["name" => "Seguros de Atividades"],
                ["name" => "Certificações de Segurança"],
                ["name" => "Licenças / Autorizações Oficiais"],
            ]],
            ['image' => '/images/activities/beginner.jpg', "name" => "Outros", "subcategories" => [
                ["name" => "Ajustes / Correções"],
                ["name" => "Doações / Apoios"],
                ["name" => "Imprevistos"],
            ]],
        ];

        foreach ($categories as $category) {
            $record = TransactionCategory::create([
                "name" => $category["name"],
                "image" => $category["image"],
            ]);

            foreach ($category["subcategories"] as $subcategory) {
                TransactionSubCategory::create([
                    "name" => $subcategory["name"],
                    "transaction_category_id" => $record->id,
                ]);
            }
        }
    }
}
