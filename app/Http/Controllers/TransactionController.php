<?php

namespace App\Http\Controllers;


use App\Http\Requests\TransactionRequest;
use App\Http\Resources\TransactionResource;
use App\Models\Tracker;
use App\Models\Transaction;
use App\Models\TransactionPartner;
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

        $record = false;

        if (array_key_exists('transaction_partner_id', $validator)) {
            if ($validator["willPay"]) {
                $corrected_amount = $validator["amount"] * 0.3;

                $record = Transaction::create($validator);

                $tracker = Tracker::where('name', 'pending_payment_partners')->first();
                Tracker::add($tracker->id, $corrected_amount, $validator["n_clients"]); // pending_payment_partners
                $tracker = Tracker::where('name', 'total_balance')->first();
                Tracker::add($tracker->id, $record->amount);
                TransactionPartner::find($validator["transaction_partner_id"])->increment('pending_payment', $corrected_amount);
            } else {
                $corrected_amount = $validator["amount"] * 0.7;

                $tracker = Tracker::where('name', 'pending_income_partners')->first();
                Tracker::add($tracker->id, $corrected_amount, $validator["n_clients"]); // pending_income_partners

                TransactionPartner::find($validator["transaction_partner_id"])->increment('pending_income', $corrected_amount);
            }
        } else {
            $record = Transaction::create($validator);
            $tracker = Tracker::where('name', 'total_balance')->first();
            Tracker::add($tracker->id, $record->amount);
        }

        DB::commit();

        if ($record) {
            return new TransactionResource($record);
        } else {
            return response()->json(null, 400);
        }
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
            SUM(CASE WHEN tracker_id = 1 THEN amount ELSE 0 END) as total_balance,
            SUM(CASE WHEN tracker_id = 1 THEN n_clients ELSE 0 END) as n_clients,
            SUM(CASE WHEN tracker_id = 2 THEN amount ELSE 0 END) as total_partners,
            SUM(CASE WHEN tracker_id = 2 THEN n_clients ELSE 0 END) as n_client_partners,
            SUM(CASE WHEN tracker_id = 5 THEN amount ELSE 0 END) as total_getyourguide
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
