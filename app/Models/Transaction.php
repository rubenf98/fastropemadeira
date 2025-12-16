<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        "amount", "date", "user_id", 'type',
        'transaction_category_id',
        'transaction_sub_category_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(TransactionCategory::class, "transaction_category_id");
    }

    public function subCategory()
    {
        return $this->belongsTo(TransactionSubCategory::class, "transaction_sub_category_id");
    }
}
