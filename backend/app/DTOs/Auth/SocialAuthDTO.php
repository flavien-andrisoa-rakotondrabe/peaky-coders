<?php

namespace App\DTOs\Auth;

use Laravel\Socialite\Contracts\User as SocialiteUser;

readonly class SocialAuthDTO
{
    public function __construct(
        public string $provider,
        public string $providerId,
        public string $firstName,
        public string $lastName,
        public string $email,
    ) {}

    public static function fromSocialiteUser(SocialiteUser $user, string $provider): self
    {
        $nameParts = explode(' ', $user->getName() ?? '', 2);

        return new self(
            provider:   $provider,
            providerId: $user->getId(),
            firstName:  $nameParts[0] ?? '',
            lastName:   $nameParts[1] ?? '',
            email:      $user->getEmail(),
        );
    }
}
