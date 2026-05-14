<?php

namespace App\DTOs\Auth;

readonly class LoginDTO
{
    public function __construct(
        public string $email,
        public string $password,
        public bool $rememberMe = false,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            email: $data['email'],
            password: $data['password'],
            rememberMe: (bool) ($data['remember_me'] ?? false),
        );
    }
}
