<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionPartnerResource;
use App\Models\Partner;
use App\Models\Tracker;
use App\Models\Transaction;
use App\Models\TransactionCategory;
use App\Models\TransactionPartner;
use App\Models\TransactionSubCategory;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HandleTransactionPartnerLiquidation extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, TransactionPartner $transactionPartner)
    {
        $validated = $request->validate([
            'type' => 'required|in:pending_payment,pending_income',
        ]);

        // DB::beginTransaction();

        $value = $validated["type"] == "pending_payment" ? -$transactionPartner[$validated['type']] : $transactionPartner[$validated['type']];

        Transaction::create([
            'amount' => $value,
            'date' => Carbon::now(),
            'transaction_partner_id' => $transactionPartner->id,
            'transaction_category_id' => TransactionCategory::where('name', "Marketing, Vendas & Parcerias")->first()->id,
            'transaction_sub_category_id' => TransactionSubCategory::where('name', "Parcerias Comerciais")->first()->id,
            'tracker_id' => Tracker::where('name', "total_partners")->first()->id,
        ]);



        Tracker::add(Tracker::where('name', "total_balance")->first()->id, $value);
        Tracker::add(Tracker::where('name', $validated['type'] . "_partners")->first()->id, -$transactionPartner[$validated['type']]);

        $transactionPartner[$validated['type']] = 0;
        $transactionPartner->save();

        // DB::commit();

        return new TransactionPartnerResource($transactionPartner);
    }
}
