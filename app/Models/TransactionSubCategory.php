<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionSubCategory extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'price', 'transaction_category_id', 'extra_field'];
}
