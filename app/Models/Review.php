<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = ['name', 'year', 'comment', 'rating', 'image'];

    protected $casts = [
        'rating' => 'decimal:2',
    ];

    use HasFactory;
}
