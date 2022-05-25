<?php

namespace App\Http\Controllers;

use App\Models\BlockReservationDate;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;

class BlockReservationDateController extends Controller
{
    /**
     * Provision a new web server.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {

        $period = CarbonPeriod::create($request->dates[0], $request->dates[1])->toArray();

        foreach ($period as $date) {
            BlockReservationDate::create([
                'date' => $date->format('Y-m-d')
            ]);
        }

        return response()->json(null, 201);
    }
}
