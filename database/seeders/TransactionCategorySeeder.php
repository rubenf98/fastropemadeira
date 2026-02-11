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
            ['image' => '/images/activities/beginner.jpg', "name" => "Canyoning", 'normal_category' => false, "subcategories" => [
                ["name" => "Nível 1 (70€)", "price" => 70, "extra_field" => "n_clients"],
                ["name" => "Nível 2 (80€)", "price" => 80, "extra_field" => "n_clients"],
                ["name" => "Nível 3 (150€)", "price" => 150, "extra_field" => "n_clients"],
            ]],
            ['image' => '/icon/mobile/transaction_categories/activity.svg', "name" => "Atividades", "subcategories" => [
                ["name" => "Canyoning", "extra_field" => "n_clients"],
                ["name" => "Sunset", "extra_field" => "n_clients"],
                ["name" => "Outros", "extra_field" => "n_clients"],
                ["name" => "Reembolso", "extra_field" => "n_clients"],
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
                ["name" => "Transfers de Clientes", "extra_field" => "n_clients"],
                ["name" => "Manutenção de Viaturas"],
                ["name" => "Combustível"],
                ["name" => "Seguros de Viaturas"],
                ["name" => "Aluguer de Viaturas"],
                ["name" => "Transporte de Equipamento"],
            ]],
            ['image' => '/icon/mobile/transaction_categories/human_resources.svg', "name" => "Recursos Humanos", "subcategories" => [
                ["name" => "Salários"],
                ["name" => "Formação"],
                ["name" => "Prémios / Incentivos"],
                ["name" => "Serviços Externos"],
                ["name" => "Pagamento de Guia", "extra_field" => "guide_name"]
            ]],
            ['image' => '/icon/mobile/transaction_categories/operations.svg', "name" => "Infraestrutura & Operações", "subcategories" => [
                ["name" => "Aluguer de Espaço / Armazém"],
                ["name" => "Manutenção Geral das Instalações"],
                ["name" => "Limpeza"],
                ["name" => "Eletricidade, Água, etc."],
                ["name" => "Armazenamento / Gestão de Stock"],
                ["name" => "Contabilidade"],
                ["name" => "Taxas Bancárias"],
                ["name" => "Serviços Jurídicos / Consultoria"],
            ]],
            ['image' => '/icon/mobile/transaction_categories/marketing.svg', "name" => "Marketing, Vendas & Parcerias", "subcategories" => [
                ["name" => "Publicidade"],
                ["name" => "Redes Sociais"],
                ["name" => "Website"],
                ["name" => "Comissões"],
                ["name" => "Parcerias Comerciais"],
                ["name" => "Vouchers / Promoções / Gift Cards"],
            ]],

            ['image' => '/icon/mobile/transaction_categories/insurance.svg', "name" => "Seguros e Licenças", "subcategories" => [
                ["name" => "Seguros de Atividades"],
                ["name" => "Certificações de Segurança"],
                ["name" => "Licenças / Autorizações Oficiais"],
            ]],
            ['image' => '/icon/mobile/transaction_categories/others.svg', "name" => "Outros", "subcategories" => [
                ["name" => "Ajustes / Correções"],
                ["name" => "Doações / Apoios"],
                ["name" => "Imprevistos"],
            ]],

        ];

        foreach ($categories as $category) {
            $record = TransactionCategory::create([
                "name" => $category["name"],
                "image" => $category["image"],
                "normal_category" => $category["normal_category"] ?? true,
            ]);

            foreach ($category["subcategories"] as $subcategory) {
                TransactionSubCategory::create([
                    "name" => $subcategory["name"],
                    "price" => $subcategory["price"] ?? null,
                    "extra_field" => $subcategory["extra_field"] ?? null,
                    "transaction_category_id" => $record->id,
                ]);
            }
        }
    }
}
