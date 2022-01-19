<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ModificationEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $reservation;
    public $changes;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($aReservation, $aChanges)
    {
        $this->reservation = $aReservation;
        $this->changes = $aChanges;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.modification')->subject('Reserva Atualizada');
    }
}
