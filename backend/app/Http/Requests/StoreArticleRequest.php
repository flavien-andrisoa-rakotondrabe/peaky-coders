<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreArticleRequest extends FormRequest
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
            'image'         => ['nullable', 'image', 'max:5120'],
            'latitude'      => ['required_if:type,evenement', 'nullable', 'numeric', 'between:-90,90'],
            'longitude'     => ['required_if:type,evenement', 'nullable', 'numeric', 'between:-180,180'],
            'location_name' => ['nullable', 'string', 'max:255'],
        ];
    }
}
