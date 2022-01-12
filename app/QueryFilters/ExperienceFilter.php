<?php

namespace App\QueryFilters;

use Cerbero\QueryFilters\QueryFilters;

/**
 * Filter records based on query parameters.
 *
 */
class ExperienceFilter extends QueryFilters
{
    //
    public function activity($id)
    {
        $this->query->where('activity_id', $id);
    }
}
