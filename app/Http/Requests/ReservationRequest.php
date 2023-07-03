<?php

namespace App\Http\Requests;

use App\Models\BlockReservationDate;
use App\Models\Experience;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use Symfony\Component\Console\Output\ConsoleOutput;

class ReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    protected function prepareForValidation()
    {
        $phone = null;
        if (array_key_exists("code", $this->phone) && array_key_exists("phone", $this->phone)) {
            $phone = "+" . $this->phone["code"] . " " . $this->phone["phone"];
        }
        $date = new Carbon($this->date);
        $nparticipants = $this->person ? count($this->person) : $this->nParticipants;
        $blockedSum = BlockReservationDate::where('date', $date->format('Y-m-d'))->where("experience_id", $this->experience_id)->sum('capacity');
        $isBlocked = $blockedSum > (15 - $nparticipants);

        $experience = Experience::find($this->experience_id);
        $price = $this->private ? 0 : ($experience->price * $nparticipants);
        $this->merge([
            'people' => $nparticipants,
            'phone' => $phone,
            'date' => $isBlocked ? null : new Carbon($this->date),
            'confirmation_token' => uniqid(),
            'hasPerson' =>  $experience->activity_id == 1,
            'price' => ($this->address && ($this->experience_id == 1 || $this->experience_id == 2)) ? $price + 5 : $price,
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'date' => 'required|date|after:today',
            'address' => 'nullable|string',
            'confirmation_token' => 'required',
            'email' => 'required|email',
            'name' => 'required|string',
            'price' => 'required',
            'notes' => 'required_if:experience_id,11|string',
            'people' => 'required|integer|min:2|max:15',
            'experience_id' => 'required|exists:experiences,id',
            'private' => 'required|boolean',
            'phone' => 'required|string',
            'person' => 'required_if:hasPerson,true',
            'person.*.birthday' => 'required|date',
            'person.*.gender' => 'required|string',
            'person.*.height' => 'required',
            'person.*.shoe' => 'required|string',
            'person.*.weight' => 'required',
        ];
    }

    /**
     * Custom message for validation
     *
     * @return array
     */
    public function messages()
    {
        return [
            'date.required' => 'Provided date is not available',
            'name.required' => 'Reservation requires a reservation name',
            'email.required' => 'Reservation requires a contact email',
            'address.required' => 'Pickup address is required',
            'person.size' => 'Information for all participants is required',
            'person.*.birthday.required' => 'Birthday for all participants is required',
            'person.*.gender.required' => 'Gender for all participants is required',
            'person.*.height.required' => 'Height for all participants is required',
            'person.*.shoe.required' => 'Show size for all participants is required',
            'person.*.weight.required' => 'Weight for all participants is required',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'errors' => $validator->errors()
        ], 422));
    }
}
