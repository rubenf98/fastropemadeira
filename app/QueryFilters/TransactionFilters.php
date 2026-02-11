<?php

namespace App\QueryFilters;

use Cerbero\QueryFilters\QueryFilters;

/**
 * Filter records based on query parameters.
 *
 */
class TransactionFilters extends QueryFilters
{
    public function pending($value)
    {
        $this->query->where("pending", $value);
    }

    public function search($string)
    {
        $this->query->whereHas("category", function ($q) use ($string) {
            $q->where("name", "like", "%$string%");
        })->orWhereHas("subCategory", function ($q) use ($string) {
            $q->where("name", "like", "%$string%");
        })->orWhereHas("tracker", function ($q) use ($string) {
            $q->where("name", "like", "%$string%");
        })->orWhereHas("partner", function ($q) use ($string) {
            $q->where("name", "like", "%$string%");
        });
    }

    public function category($array)
    {
        $q = $this->query;

        if (count($array) > 0) {
            $q->where("transaction_category_id", $array[0]);
        }
        if (count($array) > 1) {
            $q->where("transaction_sub_category_id", $array[1]);
        }
    }

    public function type($operator)
    {
        $this->query->where("amount", $operator, 0);
    }

    public function date($date)
    {
        $this->query->where("date", $date);
    }
}
