<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cerbero\QueryFilters\FiltersRecords;

class BlockReservationDate extends Model
{
    use HasFactory;
    use FiltersRecords;

    protected $fillable = ["date", "experience_id", "capacity", "reservation_id"];

    public function experience()
    {
        return $this->belongsTo('App\Models\Experience');
    }

    public function reservation()
    {
        return $this->belongsTo('App\Models\Reservation');
    }
}
