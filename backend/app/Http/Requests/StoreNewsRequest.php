<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreNewsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type'          => ['required', 'string', Rule::in(['evenement', 'divers'])],
            'date'          => ['required', 'date_format:Y-m-d'],
            'title'         => ['required', 'string', 'max:255'],
            'description'   => ['required', 'string'],
            'images'        => ['nullable', 'array', 'max:5'],
            'images.*'      => ['image', 'max:5120'],
            'latitude'      => ['required_if:type,evenement', 'nullable', 'numeric'],
            'longitude'     => ['required_if:type,evenement', 'nullable', 'numeric'],
            'location_name' => ['nullable', 'string', 'max:255'],
        ];
    }
}
