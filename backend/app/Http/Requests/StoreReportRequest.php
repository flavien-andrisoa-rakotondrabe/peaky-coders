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
            'category'      => ['required', 'string', Rule::in(['dechet', 'infrastructure', 'incendie'])],
            'images'        => ['nullable', 'array', 'max:5'],
            'images.*'      => ['image', 'max:5120'],
            'location'      => ['required', 'array'],
            'location.lat'  => ['required', 'numeric'],
            'location.lng' => ['required', 'numeric'],
            'type'          => ['required_if:category,infrastructure', 'nullable', 'string', 'max:255'],
            'status'        => ['required_if:category,infrastructure', 'nullable', 'string', 'max:255'],
        ];
    }
}
