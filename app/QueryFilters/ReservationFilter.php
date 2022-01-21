<?php

namespace App\QueryFilters;

use Cerbero\QueryFilters\QueryFilters;

/**
 * Filter records based on query parameters.
 *
 */
class ReservationFilter extends QueryFilters
{
    public function client($string)
    {
        $this->query->where('name', 'like', '%' . $string . '%')
            ->orWhere('email', 'like', '%' . $string . '%')
            ->orWhere('phone', 'like', '%' . $string . '%');
    }

    public function activity($array)
    {
        $this->query->whereHas('experience', function ($query) use ($array) {
            $query->where('id', $array[1]);
        });
    }

    public function date($string)
    {
        $this->query->where('date', $string);
    }
}
