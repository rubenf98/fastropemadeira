<?php

namespace App\Http\Resources;

use App\Models\Transaction;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
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
            'amount' =>  $this->amount,
            'date' =>  $this->date,
            'type' =>  $this->type,
            'category' => $this->category,
            'user_id' => $this->user_id,
            'n_clients' => (int) $this->n_clients,
            'guide_name' => $this->guide_name,
            'tracker' => $this->tracker,
            'subCategory' => $this->subCategory,
            'pending' => (int) $this->pending,
            'willPay' => (int) $this->willPay,
            'partner' => $this->partner,
            'description' => $this->description,
            'commission_level' => $this->commission_level,
            'commissionTo' => new TransactionResource($this->commissionTo),
        ];
    }
}
