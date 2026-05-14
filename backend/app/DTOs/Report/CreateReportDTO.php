<?php

namespace App\DTOs\Report;

readonly class CreateReportDTO
{
  public function __construct(
    public ?int $citizenId,
    public ?string $category,
    public ?string $type,
    public ?string $status,
    public ?string $location,
    public ?float $latitude,
    public ?float $longitude,
  ) {}
}
