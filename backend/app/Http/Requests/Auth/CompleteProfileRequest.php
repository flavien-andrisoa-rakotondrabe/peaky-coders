<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
        $emailRules = $this->user()->email
            ? ['sometimes', 'string', 'email', 'max:255', Rule::unique('users')->ignore($this->user()->id)]
            : ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($this->user()->id)];

        return [
            'phone'    => ['required', 'string', 'max:20', 'unique:users,phone,' . $this->user()->id],
            'email'    => $emailRules,
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ];
    }
}
