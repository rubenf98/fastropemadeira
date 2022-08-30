<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BlockReservationResource extends JsonResource
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
            'experience' =>  $this->experience ? [
                'id' => $this->experience->id,
                'name' => $this->experience->name,
            ] : [],
            'date' =>   $this->date,
            'created_at' => (string) $this->created_at,
        ];
    }
}
