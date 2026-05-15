<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category'      => ['sometimes', 'string', Rule::in(['dechet', 'infra', 'urgence', 'other'])],
            'images'        => ['nullable', 'array', 'max:5'],
            'images.*'      => ['image', 'max:5120'],
            'location'      => ['nullable', 'array'],
            'location.lat'  => ['sometimes', 'numeric'],
            'location.lng' => ['sometimes', 'numeric'],
            'type'          => ['nullable', 'string', 'max:255'],
            'status'        => ['nullable', 'string', 'max:255'],
        ];
    }
}
