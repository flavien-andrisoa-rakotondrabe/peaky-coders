<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category'      => ['required', 'string', Rule::in(['dechet', 'infra', 'incendie'])],
            'images'        => ['nullable', 'array', 'max:5'],
            'images.*'      => ['image', 'max:5120'],
            'latitude'      => ['required', 'numeric'],
            'longitude'     => ['required', 'numeric'],
            'location_name' => ['nullable', 'string', 'max:255'],
            'type'          => ['required_if:category,infra', 'nullable', 'string', 'max:255'],
            'status'        => ['required_if:category,infra', 'nullable', 'string', 'max:255'],
        ];
    }
}
