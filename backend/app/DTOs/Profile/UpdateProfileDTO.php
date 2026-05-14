<?php

namespace App\DTOs\Profile;

readonly class UpdateProfileDTO
{
    public function __construct(
        public ?string $name,
        public ?string $email,
        public ?string $phone = null,
        public ?string $currentPassword = null,
        public ?string $newPassword = null,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            name:            $data['name'] ?? null,
            email:           $data['email'] ?? null,
            phone:           $data['phone'] ?? null,
            currentPassword: $data['current_password'] ?? null,
            newPassword:     $data['password'] ?? null,
        );
    }
}
