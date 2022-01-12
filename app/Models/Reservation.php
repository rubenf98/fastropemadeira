<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = ['private', 'people', 'notes', 'name', 'email', 'address', 'phone', 'date', 'experience_id', "confirmation_token"];
    protected $append = ["total"];

    public function getTotalAttribute()
    {
        return ($this->private ? $this->experience->private_price : $this->experience->price) * $this->people;
    }

    public function participants()
    {
        return $this->hasMany('App\Models\ReservationParticipant');
    }

    public function experience()
    {
        return $this->belongsTo('App\Models\Experience');
    }

    public function storeParticipants($participants)
    {
        foreach ($participants as $key => $participant) {
            // $print = new \Symfony\Component\Console\Output\ConsoleOutput();
            // $print->writeln($participant['birthday']);
            $participant['birthday']  = new Carbon($participant['birthday']);
            $p = new ReservationParticipant($participant);
            $this->participants()->save($p);
        }
    }


    public static function disabledDates()
    {
        $reservations = Reservation::where("date", ">", Carbon::now())->latest()->get();
        $disabled = [];
        $dates = [];
        $print = new \Symfony\Component\Console\Output\ConsoleOutput();


        foreach ($reservations as  $reservation) {

            if (!in_array($reservation->date, $disabled)) {
                if (array_key_exists($reservation->date, $dates)) {
                    $dates[$reservation->date] = $dates[$reservation->date] + $reservation->participants()->count();
                } else $dates[$reservation->date] = $reservation->participants()->count();

                if ($dates[$reservation->date] >= 12 || $reservation->private) {
                    array_push($disabled, $reservation->date);
                }
            }
        }

        return ["dates" => $dates, "disabled" => $disabled];
    }
}
