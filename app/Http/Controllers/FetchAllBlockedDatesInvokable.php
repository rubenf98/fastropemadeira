<?php

namespace App\Http\Controllers;

use App\Models\BlockReservationDate;
use App\Models\Experience;
use Carbon\Carbon;
use Illuminate\Http\Request;

class FetchAllBlockedDatesInvokable extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $dates =  BlockReservationDate::where("date", ">", Carbon::now())->get()->groupBy(['experience_id', 'date']);

        $collection = [];
        foreach ($dates as $date) {
            foreach ($date as $key => $blockedDate) {

                $sum = 0;
                foreach ($blockedDate as $element) {
                    $sum += $element->capacity;
                }
                $participants = $request->participants ? $request->participants : 5;

                if ($sum > 15 - $participants) {
                    array_push($collection, $key);
                }
            }
        }

        return $collection;
    }
}
