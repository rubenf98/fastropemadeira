<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ExperienceResource extends JsonResource
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
            'images' => $this->images,
            'activity_id' =>  $this->activity_id,
            'name' =>  $this->getTranslations('name'),
            'description' => $this->getTranslations('description'),
            'distance' =>  $this->getTranslations('distance'),
            'duration' => $this->getTranslations('duration'),
            'height' => $this->getTranslations('height'),
            'level' => $this->getTranslations('level'),
            'price' => $this->price,
        ];
    }
}
