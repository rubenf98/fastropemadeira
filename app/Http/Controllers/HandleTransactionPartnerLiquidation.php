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

        Transaction::where('transaction_partner_id', $transactionPartner->id)
            ->where('pending', 1)->where('willPay', $validated['type'] == "pending_payment" ? 1 : 0)
            ->update(['pending' => 0]);


        return new TransactionPartnerResource($transactionPartner->fresh());
    }
}
