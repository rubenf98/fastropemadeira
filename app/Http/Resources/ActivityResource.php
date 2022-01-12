<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ActivityResource extends JsonResource
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
            'value' => $this->id,
            'image' => $this->image,
            'label' =>  $this->getTranslation('name', $request->language),
            'description' => $this->getTranslation('description', $request->language),
            'children' => MinExperienceResource::collection($this->experiences),
        ];
    }
}
