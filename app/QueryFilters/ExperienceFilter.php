<?php

namespace App\QueryFilters;

use Cerbero\QueryFilters\QueryFilters;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Console\Output\ConsoleOutput;

/**
 * Filter records based on query parameters.
 *
 */
class ExperienceFilter extends QueryFilters
{
    protected $people = 15;

    public function activity($id)
    {
        $this->query->where('activity_id', $id);
    }

    public function people($int)
    {
        $this->people = 15 - $int;
        return $this->query;
    }

    public function date($date)
    {

        $this->query->withSum(
            [
                'blockedDates' => function ($query) use ($date) {
                    $query->where('date', $date)->select(DB::raw('COALESCE(SUM(capacity), 0)'));
                }
            ],
            'capacity'
        )->having('blocked_dates_sum_capacity', '<=', $this->people);

        // ->having('blocked_dates_sum_capacity', '<', 15)
        // $this->query->withCount([
        //     'blockedDates' => function ($query) use ($date) {
        //         $query->where('date', $date);
        //     },
        // ])->having('blocked_dates_count', '<', 10);
    }
}
