<?php

namespace App\DTOs\Report;

readonly class UpdateReportDTO
{
    public function __construct(
        public ?string $category,
        public ?string $type,
        public ?string $status,
        public ?string $image,
        public ?float $latitude,
        public ?float $longitude,
        public ?string $locationName,
    ) {}
}
