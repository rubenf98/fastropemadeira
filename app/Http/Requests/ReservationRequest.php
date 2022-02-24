<?php

namespace App\Http\Requests;

use App\Models\Experience;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

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
            $phone = $this->phone["code"] . $this->phone["phone"];
        }

        $experience = Experience::find($this->experience_id);
        $this->merge([
            'phone' =>  $phone,
            'date' => new Carbon($this->date),
            'confirmation_token' => uniqid(),
            'hasPerson' => $this->experience_id < 6 ?  true : false,
            'price' => ($this->private ? $experience->private_price : $experience->price) * $this->people,
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
            'address' => 'required|string',
            'confirmation_token' => 'required',
            'email' => 'required|email',
            'name' => 'required|string',
            'price' => 'required',
            'notes' => 'required_if:experience_id,11|string',
            'people' => 'required|integer|min:2|max:15',
            'experience_id' => 'required|exists:experiences,id',
            'private' => 'required|boolean',
            'phone' => 'nullable|numeric',
            'person' => 'required_if:hasPerson,true|size:' . $this->people,
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
