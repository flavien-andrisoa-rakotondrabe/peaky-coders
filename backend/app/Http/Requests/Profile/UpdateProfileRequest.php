<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'                 => ['sometimes', 'string', 'max:255'],
            'email'                => ['sometimes', 'string', 'email', 'max:255', Rule::unique('users')->ignore($this->user()->id)],
            'phone'                => ['sometimes', 'string', 'max:20', Rule::unique('users')->ignore($this->user()->id)],
            'avatar'               => ['sometimes', 'nullable', 'string', 'url', 'max:2048'],
            'current_password'     => ['required_with:password', 'string'],
            'password'             => ['sometimes', 'string', 'min:8', 'confirmed'],
            'password_confirmation' => ['required_with:password', 'string'],
        ];
    }
}
