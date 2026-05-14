<?php

namespace App\Repositories;

use App\Models\Citizen;
use Illuminate\Support\Str;

class CitizenRepository
{
    public function findByToken(string $token): ?Citizen
    {
        return Citizen::query()->where('token', $token)->first();
    }

    public function create(array $data): Citizen
    {
        return Citizen::query()->create([
            'name'       => $data['name'],
            'token'      => Str::uuid()->toString(),
            'expires_at' => now()->addMinutes((int) env('CITIZEN_TOKEN_TTL_MINUTES', 1440)),
        ]);
    }
}
