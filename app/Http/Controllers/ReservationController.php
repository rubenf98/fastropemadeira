<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReservationRequest;
use App\Http\Requests\UpdateReservationRequest;
use App\Http\Resources\ReservationResource;
use App\Jobs\ConfirmationEmail;
use App\Jobs\NotificationEmail;
use App\Mail\ConfirmationMail;
use App\Models\Reservation;
use Illuminate\Http\Request;

use DB;
use Illuminate\Support\Facades\Mail;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ReservationResource::collection(Reservation::latest()->paginate(10));
    }

    /**
     * Return list of disabled dates
     *
     * @return \Illuminate\Http\Response
     */
    public function disabledDates(Request $request)
    {
        return Reservation::disabledDates($request->people);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function showFromToken(Request $request)
    {
        $reservation = Reservation::where("confirmation_token", $request->token)->first();

        if (!$reservation->confirmation) {
            NotificationEmail::dispatch($reservation)->delay(now()->addSecond());
            $reservation->confirmation = true;
            $reservation->save();
        }

        return new ReservationResource($reservation);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ReservationRequest $request)
    {
        $validator = $request->validated();

        DB::beginTransaction();
        $record = Reservation::create($validator);
        if (array_key_exists('person', $validator)) {
            $record->storeParticipants($validator['person']);
        }
        DB::commit();

        ConfirmationEmail::dispatch($record->email, $record->confirmation_token)
            ->delay(now()->addSecond());

        return new ReservationResource($record);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function show(Reservation $reservation)
    {
        return new ReservationResource($reservation);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateReservationRequest $request, Reservation $reservation)
    {
        $validator = $request->validated();
        $reservation->update($validator);

        return new ReservationResource($reservation);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Reservation $reservation)
    {
        $reservation->delete();

        return response()->json(null, 204);
    }
}
