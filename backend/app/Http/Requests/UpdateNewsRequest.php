<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateNewsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type'          => ['sometimes', 'string', Rule::in(['event', 'divers'])],
            'date'          => ['sometimes', 'date_format:Y-m-d'],
            'title'         => ['sometimes', 'string', 'max:255'],
            'description'   => ['sometimes', 'string'],
            'images'        => ['nullable', 'array', 'max:5'],
            'images.*'      => ['image', 'max:5120'],
            'location'      => ['nullable', 'array'],
            'location.lat'  => ['nullable', 'numeric'],
            'location.lng' => ['nullable', 'numeric'],
        ];
    }
}
