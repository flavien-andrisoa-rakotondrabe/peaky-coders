<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CompleteProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'phone'    => ['required', 'string', 'max:20', 'unique:users,phone,' . $this->user()->id],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ];
    }
}
