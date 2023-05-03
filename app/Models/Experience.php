<?php

namespace App\Models;

use App\Casts\CustomInt;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;
use Cerbero\QueryFilters\FiltersRecords;
use Illuminate\Database\Eloquent\SoftDeletes;

class Experience extends Model
{
    use SoftDeletes;
    use HasTranslations;
    use FiltersRecords;

    public $translatable = [
        'name', 'description', 'level',
        'distance',
        'height', 'duration'
    ];

    protected $casts = [
        'blocked_dates_sum_capacity' => CustomInt::class,
    ];

    protected $fillable = ['price'];
    public function activity()
    {
        return $this->belongsTo("App\Models\Activity");
    }

    public function blockedDates()
    {
        return $this->hasMany(BlockReservationDate::class);
    }

    public function images()
    {
        return $this->hasMany("App\Models\ExperienceImage");
    }
}
