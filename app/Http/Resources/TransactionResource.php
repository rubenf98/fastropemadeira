<?php

namespace App\Http\Resources;

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
            'subCategory' => $this->subCategory,
        ];
    }
}
