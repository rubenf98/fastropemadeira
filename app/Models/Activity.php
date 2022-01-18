<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Activity extends Model
{
    use HasTranslations;

    public $translatable = [
        'name', 'description'
    ];

    public function experiences()
    {
        return $this->hasMany("App\Models\Experience");
    }

    public function reservations()
    {
        return $this->hasManyThrough(Reservation::class, Experience::class);
    }
}
