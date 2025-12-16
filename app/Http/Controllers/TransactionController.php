<?php

namespace App\Http\Controllers;


use App\Http\Requests\TransactionRequest;
use App\Http\Resources\TransactionResource;
use App\Models\Tracker;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return TransactionResource::collection(Transaction::orderBy("date", "desc")->paginate(10));
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
        $record = Transaction::create($validator);
        Tracker::add($record->amount, $record->type);
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
    public function barChartStatistics()
    {
        $fiveMonthsAgo = now()->startOfMonth()->subMonths(4);

        // Eloquent query using the Transaction model
        $rows = Transaction::query()
            ->selectRaw("
            DATE_FORMAT(date, '%Y-%m') as month,
            SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as total_income,
            SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as total_expense
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
                'total_income'  => $rows[$month]->total_income ?? 0,
                'total_expense' => $rows[$month]->total_expense ?? 0,
            ]);
        }

        return $months->sortBy('month')->values();
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
        Tracker::updateValues($transaction->amount, $validator["amount"], $transaction->type, $validator["type"]);
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
        //
    }
}
