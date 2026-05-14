<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateArticleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type'          => ['sometimes', 'string', Rule::in(['evenement', 'divers'])],
            'date'          => ['sometimes', 'date_format:Y-m-d'],
            'title'         => ['sometimes', 'string', 'max:255'],
            'description'   => ['sometimes', 'string'],
            'images'        => ['nullable', 'array', 'max:5'],
            'images.*'      => ['image', 'max:5120'],
            'latitude'      => ['nullable', 'numeric'],
            'longitude'     => ['nullable', 'numeric'],
            'location_name' => ['nullable', 'string', 'max:255'],
        ];
    }
}
