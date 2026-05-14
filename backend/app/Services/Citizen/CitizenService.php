<?php

namespace App\Services\Citizen;

use App\DTOs\Citizen\CreateCitizenDTO;
use App\Models\Citizen;
use App\Repositories\CitizenRepository;

class CitizenService
{
    public function __construct(
        private readonly CitizenRepository $repository,
    ) {}

    public function register(CreateCitizenDTO $dto): Citizen
    {
        return $this->repository->create(['name' => $dto->name]);
    }
}
