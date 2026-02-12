<?php

namespace App\Http\Controllers;


use App\Http\Requests\TransactionRequest;
use App\Http\Resources\TransactionResource;
use App\Models\Tracker;
use App\Models\Transaction;
use App\Models\TransactionCategory;
use App\Models\TransactionPartner;
use App\Models\TransactionSubCategory;
use App\QueryFilters\TransactionFilters;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(TransactionFilters $filters)
    {
        return TransactionResource::collection(Transaction::filterBy($filters)->orderBy("updated_at", "desc")->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TransactionRequest $request)
    {
        $validator = $request->validated();

        DB::beginTransaction();

        $record = false;

        if ($validator['type'] == "total_partners") {
            if ($validator["willPay"]) {

                Transaction::create(array_merge(
                    $validator,
                    [
                        'pending' => 1,
                        'amount' => -($validator['amount'] * 0.3),
                        'transaction_category_id' => TransactionCategory::where('name', 'Marketing, Vendas & Parcerias')->first()->id,
                        'transaction_sub_category_id' => TransactionSubCategory::where('name', 'Comissões')->first()->id,
                    ]
                ));

                $totalValidator = [
                    "amount" => $validator["amount"] * 0.7,
                    "n_clients" => $validator["n_clients"],
                    "date" => $validator["date"],
                    "tracker_id" => $validator["tracker_id"],
                    "transaction_category_id" => $validator["transaction_category_id"],
                    "transaction_sub_category_id" => $validator["transaction_sub_category_id"],
                ];

                $record = Transaction::create($totalValidator);
            } else {
                $record = Transaction::create(array_merge(
                    $validator,
                    [
                        "transaction_partner_id" => $validator["transaction_partner_id"],
                        "pending" => 1,
                        "amount" => $validator["amount"] * 0.7,
                        'transaction_category_id' => TransactionCategory::where('name', "Marketing, Vendas & Parcerias")->first()->id,
                        'transaction_sub_category_id' => TransactionSubCategory::where('name', "Comissões")->first()->id,
                    ]
                ));
            }
        } else if ($validator['type'] == "total_balance") {
            $record = Transaction::create($validator);
        } else if ($validator['type'] == "total_getyourguide") {
            $record = Transaction::create(array_merge(
                $validator,
                [
                    "amount" => $validator["amount"] * 0.7,
                ]
            ));
        }

        DB::commit();


        return new TransactionResource($record);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function show(Transaction $transaction)
    {
        return new TransactionResource($transaction);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function barChartStatistics(Request $request)
    {
        $fiveMonthsAgo = now()->startOfMonth()->subMonths(4);

        $filters = $request->only([
            'date_from',
            'date_to',
        ]);


        // Eloquent query using the Transaction model
        $rows = Transaction::query()
            ->selectRaw("
            DATE_FORMAT(date, '%Y-%m') as month,
            SUM(
                CASE
                    WHEN pending = 0 THEN amount -- valor já recebido, por isso é o valor normal
                    WHEN (pending = 1 AND willPay = 0) THEN 0 -- valor vai ser positivo, mas ainda não recebeu, por isso é 0
                    WHEN (pending = 1 AND willPay = 1) THEN ABS(amount) -- valor vai ser negativo, mas ainda não pagou, por isso é absolute
                    ELSE 0
                END
            ) AS total_balance,
            SUM(CASE WHEN tracker_id = 1 AND pending = 0 THEN n_clients ELSE 0 END) as n_clients,
            SUM(CASE WHEN pending = 1 THEN amount ELSE 0 END) as total_partners,
            SUM(CASE WHEN tracker_id = 2 AND pending = 0 THEN n_clients ELSE 0 END) as n_client_partners,
            SUM(CASE WHEN tracker_id = 3 AND pending = 0 THEN amount ELSE 0 END) as total_getyourguide
        ")
            ->where('date', '>=', $fiveMonthsAgo)
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get()
            ->keyBy('month');

        // Build a complete list of the last 5 months (including empty months)
        $months = collect();
        for ($i = 0; $i < 5; $i++) {
            $month = now()->startOfMonth()->subMonths($i)->format('Y-m');

            $months->put($month, (object) [
                'month'         => $month,
                'total_balance' => $rows[$month]->total_balance ?? 0,
                'total_partners'  => $rows[$month]->total_partners ?? 0,
                'total_getyourguide' => $rows[$month]->total_getyourguide ?? 0,
                'n_clients' => $rows[$month]->n_clients ?? 0,
                'n_client_partners' => $rows[$month]->n_client_partners ?? 0,
            ]);
        }

        // $allTime = Cache::remember(
        //     'transactions:all_time_stats',
        //     now()->addMinutes(1),
        //     fn () => Transaction::query()
        //         ->selectRaw("
        //     SUM(CASE WHEN tracker_id = 1 AND pending = 0 THEN amount ELSE 0 END) as total_balance,
        //     SUM(CASE WHEN tracker_id = 1 AND pending = 0 THEN n_clients ELSE 0 END) as n_clients,
        //     SUM(CASE WHEN tracker_id = 2 AND pending = 0 THEN amount ELSE 0 END) as total_partners,
        //     SUM(CASE WHEN tracker_id = 2 AND pending = 0 THEN n_clients ELSE 0 END) as n_client_partners,
        //     SUM(CASE WHEN tracker_id = 5 AND pending = 0 THEN amount ELSE 0 END) as total_getyourguide,
        //     SUM(CASE WHEN pending = 1 AND willPay = 0 THEN amount ELSE 0 END) as pending_income,
        //     SUM(CASE WHEN pending = 1 AND willPay = 1 THEN amount ELSE 0 END) as pending_payment
        // ")->first()
        // );

        $dateFiltered = Transaction::query()
            ->when(
                $filters['date_from'] ?? null,
                fn ($q, $dateFrom) =>
                $q->whereDate('date', '>=', $dateFrom)
            )
            ->when(
                $filters['date_to'] ?? null,
                fn ($q, $dateTo) =>
                $q->whereDate('date', '<=', $dateTo)
            )
            ->selectRaw("
        SUM(
            CASE
                WHEN pending = 0 THEN amount
                WHEN pending = 1 AND willPay = 0 THEN 0
                WHEN pending = 1 AND willPay = 1 THEN ABS(amount)
                ELSE 0
            END
        ) AS total_balance,
         SUM(CASE WHEN tracker_id = 3 THEN amount ELSE 0 END) as total_getyourguide
    ")->first();


        $allTime = Transaction::query()
            ->selectRaw("
            SUM(CASE WHEN tracker_id = 1 AND pending = 0 THEN n_clients ELSE 0 END) as n_clients,
            SUM(CASE WHEN pending = 1 THEN amount ELSE 0 END) as total_partners,
            SUM(CASE WHEN tracker_id = 2 AND pending = 0 THEN n_clients ELSE 0 END) as n_client_partners,
            SUM(CASE WHEN pending = 1 AND willPay = 0 THEN amount ELSE 0 END) as pending_income,
            SUM(CASE WHEN pending = 1 AND willPay = 1 THEN amount ELSE 0 END) as pending_payment
        ")->first();


        return response()->json([
            'months' => $months->sortBy('month')->values(),
            'all_time' => [
                'total_balance' => (float) $dateFiltered->total_balance,
                'total_partners' => (float) $allTime->total_partners,
                'total_getyourguide' => (float) $dateFiltered->total_getyourguide,
                'n_clients' => (int) $allTime->n_clients,
                'n_client_partners' => (int) $allTime->n_client_partners,
                'pending_income' => (float) $allTime->pending_income,
                'pending_payment' => (float) $allTime->pending_payment,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function update(TransactionRequest $request, Transaction $transaction)
    {
        $validator = $request->validated();

        DB::beginTransaction();
        // Tracker::updateValues($transaction->amount, $validator["amount"], $transaction->type, $validator["type"]);
        $transaction->update($validator);

        DB::commit();

        return new TransactionResource($transaction);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function destroy(Transaction $transaction)
    {
        DB::beginTransaction();

        // Tracker::updateValues($transaction->amount, 0, $transaction->type, $transaction->type);
        $transaction->delete();
        DB::commit();
        return response()->json(null, 204);
    }
}
