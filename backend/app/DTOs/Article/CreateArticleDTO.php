<?php

namespace App\DTOs\Article;

readonly class CreateArticleDTO
{
    public function __construct(
        public int $citizenId,
        public string $type,
        public string $title,
        public string $description,
        public ?string $image,
        public ?float $latitude,
        public ?float $longitude,
        public ?string $locationName,
    ) {}
}
