<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        "amount", "date", "user_id", 'tracker_id', "n_clients",
        'transaction_category_id',
        'transaction_sub_category_id',
        'transaction_partner_id',
        'description',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tracker()
    {
        return $this->belongsTo(Tracker::class);
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
