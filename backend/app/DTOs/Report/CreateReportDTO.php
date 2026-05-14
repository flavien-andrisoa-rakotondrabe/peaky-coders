<?php

namespace App\DTOs\Report;

readonly class CreateReportDTO
{
    public function __construct(
        public ?int $userId,
        public ?string $category,
        public ?string $type,
        public ?string $status,
        public ?float $lat,
        public ?float $lng,
    ) {}
}
