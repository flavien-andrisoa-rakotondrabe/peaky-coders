<?php

namespace App\DTOs\Auth;

readonly class RegisterDTO
{
    public function __construct(
        public string $name,
        public string $email,
        public string $password,
        public bool $rememberMe = false,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            name: $data['name'],
            email: $data['email'],
            password: $data['password'],
            rememberMe: (bool) ($data['remember_me'] ?? false),
        );
    }
}
