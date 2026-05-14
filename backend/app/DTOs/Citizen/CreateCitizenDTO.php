<?php

namespace App\DTOs\Citizen;

readonly class CreateCitizenDTO
{
    public function __construct(
        public string $name,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(name: $data['name']);
    }
}
