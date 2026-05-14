<?php

namespace App\DTOs\Article;

readonly class CreateArticleDTO
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
