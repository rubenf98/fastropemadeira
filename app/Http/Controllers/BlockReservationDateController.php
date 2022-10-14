<?php

namespace App\Http\Controllers;

use App\Http\Resources\BlockReservationResource;
use App\Models\BlockReservationDate;
use App\QueryFilters\BlockReservationFilters;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;

class BlockReservationDateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(BlockReservationFilters $filters)
    {
        return BlockReservationResource::collection(BlockReservationDate::filterBy($filters)->where("date", ">", Carbon::now())->orderBy('date', 'DESC')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $period = CarbonPeriod::create($request->dates[0], $request->dates[1])->toArray();
        $experiences = $request->experiences;
        foreach ($experiences as $id => $experience) {
            if ($experience) {
                foreach ($period as $date) {
                    BlockReservationDate::create([
                        'date' => $date->format('Y-m-d'),
                        'experience_id' => $id
                    ]);
                }
            }
        }

        return response()->json(null, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function show(BlockReservationDate $blockDate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BlockReservationDate $blockDate)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function destroy(BlockReservationDate $blockDate)
    {
        $blockDate->delete();

        return response()->json(null, 204);
    }
}
