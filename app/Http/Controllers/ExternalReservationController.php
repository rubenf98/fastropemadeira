<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExternalReservationRequest;
use App\Http\Resources\ReservationResource;
use App\Models\BlockReservationDate;
use App\Models\Reservation;
use Illuminate\Support\Facades\DB;

class ExternalReservationController extends Controller
{
    /**
     * handle new reservation from external sources
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(ExternalReservationRequest $request)
    {
        $validator = $request->validated();

        DB::beginTransaction();
        $record = Reservation::create($validator);

        if ($validator['people'] != 0) {
            BlockReservationDate::create([
                'experience_id' => $validator['experience_id'],
                'reservation_id' => $record->id,
                'capacity' => $validator['people'],
                'date' => $validator['date']
            ]);
        }
        DB::commit();

        return new ReservationResource($record);
    }
}
