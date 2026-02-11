<?php

namespace App\Http\Resources;

use App\Models\Transaction;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionPartnerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'pending_payment' => (float) Transaction::where('transaction_partner_id', $this->id)->where('pending', 1)->where('willPay', 1)->sum('amount'),
            'pending_income' => (float) Transaction::where('transaction_partner_id', $this->id)->where('pending', 1)->where('willPay', 0)->sum('amount'),
        ];
    }
}
