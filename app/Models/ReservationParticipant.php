<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReservationParticipant extends Model
{
    protected $fillable = ['birthday', 'gender', 'height', 'weight', 'shoe'];
    use HasFactory;

    public function reservation()
    {
        return $this->belongsTo('App\Models\Reservation');
    }
}
