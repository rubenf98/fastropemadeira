<?php

namespace App\Models;

use Cerbero\QueryFilters\FiltersRecords;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionCategory extends Model
{
    use HasFactory, FiltersRecords;

    public function subCategories()
    {
        return $this->hasMany(TransactionSubCategory::class);
    }
}
