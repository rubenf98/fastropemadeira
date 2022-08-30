<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlockReservationDate extends Model
{
    use HasFactory;

    protected $fillable = ["date", "experience_id"];

    public function experience()
    {
        return $this->belongsTo('App\Models\Experience');
    }
}
