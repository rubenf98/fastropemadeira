<?php

namespace App\Models;

use Cerbero\QueryFilters\FiltersRecords;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory, FiltersRecords;

    protected $fillable = [
        "amount", "date", "user_id", 'tracker_id', "n_clients",
        'transaction_category_id',
        'transaction_sub_category_id',
        'transaction_partner_id',
        'description', "pending", "willPay", "guide_name"
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

    public function partner()
    {
        return $this->belongsTo(TransactionPartner::class, "transaction_partner_id");
    }
}
