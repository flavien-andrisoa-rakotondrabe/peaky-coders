<?php

namespace App\DTOs\News;

readonly class CreateNewsDTO
{
    public function __construct(
        public int $userId,
        public string $type,
        public ?string $date,
        public string $title,
        public string $description,
        public ?float $latitude,
        public ?float $longitude,
        public ?string $locationName,
    ) {}
}
