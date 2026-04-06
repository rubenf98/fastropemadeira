<?php

namespace App\Http\Requests;

use App\Models\Tracker;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class TransactionRequest extends FormRequest
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
            'transaction_category_id' =>  $this->category[0],
            'transaction_sub_category_id' => $this->category[1],
            'user_id' => auth()->id(),
            'tracker_id' => Tracker::where("name", $this->type)->first()->id ?? null,
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
            'amount' => 'required|numeric',
            'n_clients' => 'nullable|integer',
            'date' => 'required|date_format:Y-m-d',
            'type' => 'required|string|exists:trackers,name',
            'tracker_id' => 'required|integer|exists:trackers,id',
            'transaction_category_id' => 'required|integer',
            'transaction_sub_category_id' => 'required|integer',
            'willPay' => 'sometimes|integer',
            'description' => 'nullable|string',
            'transaction_partner_id' => 'nullable|integer|exists:transaction_partners,id',
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
