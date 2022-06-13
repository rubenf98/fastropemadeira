<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;
use Cerbero\QueryFilters\FiltersRecords;

class Experience extends Model
{
    use HasTranslations;
    use FiltersRecords;

    public $translatable = [
        'name', 'description', 'level',
        'distance',
        'height', 'duration'
    ];

    public function activity()
    {
        return $this->belongsTo("App\Models\Activity");
    }

    public function images()
    {
        return $this->hasMany("App\Models\ExperienceImage");
    }
}
