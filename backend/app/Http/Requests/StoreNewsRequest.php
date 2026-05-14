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
            'type'          => ['required', 'string', Rule::in(['event', 'divers'])],
            'date'          => ['required_if:type,event', 'nullable', 'date_format:Y-m-d'],
            'title'         => ['required', 'string', 'max:255'],
            'description'   => ['required', 'string'],
            'images'        => ['nullable', 'array', 'max:5'],
            'images.*'      => ['image', 'max:5120'],
            'location'      => ['nullable', 'array'],
            'location.lat'  => ['required_if:type,event', 'nullable', 'numeric'],
            'location.long' => ['required_if:type,event', 'nullable', 'numeric'],
        ];
    }
}
