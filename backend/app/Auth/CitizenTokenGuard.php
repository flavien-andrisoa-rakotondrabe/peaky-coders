<?php

namespace App\Auth;

use App\Repositories\CitizenRepository;
use Illuminate\Auth\GuardHelpers;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;

class CitizenTokenGuard implements Guard
{
    use GuardHelpers;

    public function __construct(
        private readonly CitizenRepository $repository,
        private readonly Request $request,
    ) {}

    public function user(): mixed
    {
        if ($this->user !== null) {
            return $this->user;
        }

        $token = $this->request->header('X-Citizen-Token');

        if (! $token) {
            return null;
        }

        $citizen = $this->repository->findByToken($token);

        if (! $citizen) {
            return null;
        }

        if ($citizen->expires_at && $citizen->expires_at->isPast()) {
            return null;
        }

        return $this->user = $citizen;
    }

    public function validate(array $credentials = []): bool
    {
        return false;
    }
}
