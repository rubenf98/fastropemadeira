<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReservationRequest;
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
        //
    }

    /**
     * Return list of disabled dates
     *
     * @return \Illuminate\Http\Response
     */
    public function disabledDates()
    {
        return Reservation::disabledDates();
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
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function edit(Reservation $reservation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Reservation $reservation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Reservation $reservation)
    {
        //
    }
}
