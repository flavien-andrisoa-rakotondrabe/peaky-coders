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
            'category'      => ['sometimes', 'string', Rule::in(['dechet', 'infra', 'incendie'])],
            'image'         => ['nullable', 'image', 'max:5120'],
            'latitude'      => ['sometimes', 'numeric', 'between:-90,90'],
            'longitude'     => ['sometimes', 'numeric', 'between:-180,180'],
            'location_name' => ['nullable', 'string', 'max:255'],
            'type'          => ['nullable', 'string', 'max:255'],
            'status'        => ['nullable', 'string', 'max:255'],
        ];
    }
}
