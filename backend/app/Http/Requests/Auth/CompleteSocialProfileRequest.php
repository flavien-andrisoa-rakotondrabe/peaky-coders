<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class CompleteSocialProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'phone'                 => ['required', 'string', 'max:20', 'unique:users,phone'],
            'email'                 => ['sometimes', 'nullable', 'string', 'email', 'max:255', 'unique:users,email'],
            'password'              => ['nullable', 'string', 'min:8', 'confirmed'],
            'password_confirmation' => ['nullable', 'string'],
        ];
    }
}
