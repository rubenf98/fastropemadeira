<?php

namespace App\Http\Requests;

use App\Models\Experience;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class ExternalReservationRequest extends FormRequest
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
        $this->merge([
            'date' => new Carbon($this->date),
            'confirmation_token' => uniqid(),
            'experience_id' => $this->experience[1],
            'confirmation' => 1,
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
            'confirmation_token' => 'required',
            'source' => 'required',
            'confirmation' => 'required',
            'email' => 'required|email',
            'name' => 'required|string',
            'price' => 'required',
            'people' => 'required|integer|min:2|max:15',
            'experience_id' => 'required|exists:experiences,id',
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
