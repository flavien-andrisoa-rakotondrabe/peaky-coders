<?php

namespace App\DTOs\Auth;

readonly class RegisterDTO
{
    public function __construct(
        public string $firstName,
        public string $lastName,
        public string $email,
        public string $password,
        public ?string $phone = null,
        public bool $rememberMe = false,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            firstName:  $data['first_name'],
            lastName:   $data['last_name'],
            email:      $data['email'],
            password:   $data['password'],
            phone:      $data['phone'] ?? null,
            rememberMe: (bool) ($data['remember_me'] ?? false),
        );
    }
}
