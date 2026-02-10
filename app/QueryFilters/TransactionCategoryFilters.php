<?php

namespace App\QueryFilters;

use Cerbero\QueryFilters\QueryFilters;

/**
 * Filter records based on query parameters.
 *
 */
class TransactionCategoryFilters extends QueryFilters
{
    public function normal(bool $boolean)
    {
        $this->query->where('normal_category', true);
    }

    public function notNormal(bool $boolean)
    {

        $this->query->where('normal_category', false);
    }
}
