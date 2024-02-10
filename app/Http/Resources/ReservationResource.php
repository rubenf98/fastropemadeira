<?php

namespace App\Http\Resources;

use App\Models\Experience;
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
            'experience' => new ExperienceResource($this->experience),
            'activity' => $this->activity(Experience::where('id', $this->experience_id)->pluck('activity_id')->first()),
            'name' =>   $this->name,
            'email' =>   $this->email,
            'price' =>   $this->price,
            'partner' =>   $this->partner,
            'address' =>   $this->address,
            'phone' =>   $this->phone,
            'source' =>   $this->source,
            'date' =>   $this->date,
            'time' =>   $this->time,
            'people' =>   $this->people,
            'notes' =>   $this->notes,
            'private' =>   (int) $this->private,
            'confirmation' =>  (int) $this->confirmation,
            'participants' =>   $this->participants,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
