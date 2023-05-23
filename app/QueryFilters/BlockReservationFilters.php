<?php

namespace App\QueryFilters;

use Cerbero\QueryFilters\QueryFilters;

/**
 * Filter records based on query parameters.
 *
 */
class BlockReservationFilters extends QueryFilters
{
    public function date($date)
    {
        $this->query->where('date', $date);
    }

    public function experience($experience)
    {
        $this->query->where('experience_id', $experience);
    }
}
