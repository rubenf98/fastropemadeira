<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
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
            'experience' =>   $this->experience,
            'name' =>   $this->name,
            'email' =>   $this->email,
            'total' =>   $this->total,
            'address' =>   $this->address,
            'phone' =>   $this->phone,
            'date' =>   $this->date,
            'time' =>   $this->time,
            'people' =>   $this->people,
            'notes' =>   $this->notes,
            'private' =>   $this->private,
            'confirmation' =>   $this->confirmation,
            'participants' =>   $this->participants,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
