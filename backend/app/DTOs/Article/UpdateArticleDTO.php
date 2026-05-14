<?php

namespace App\DTOs\Article;

readonly class UpdateArticleDTO
{
    public function __construct(
        public ?string $type,
        public ?string $title,
        public ?string $description,
        public ?string $image,
        public ?float $latitude,
        public ?float $longitude,
        public ?string $locationName,
    ) {}
}
