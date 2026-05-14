<?php

namespace App\DTOs\Auth;

use Laravel\Socialite\Contracts\User as SocialiteUser;

readonly class SocialAuthDTO
{
    public function __construct(
        public string $googleId,
        public string $name,
        public string $email,
    ) {}

    public static function fromSocialiteUser(SocialiteUser $user): self
    {
        return new self(
            googleId: $user->getId(),
            name: $user->getName(),
            email: $user->getEmail(),
        );
    }
}
