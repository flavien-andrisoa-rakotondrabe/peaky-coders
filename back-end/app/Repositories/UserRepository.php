<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    public function findByGoogleId(string $googleId): ?User
    {
        return User::query()
            ->where('google_id', $googleId)
            ->first();
    }

    public function findByEmail(string $email): ?User
    {
        return User::query()
            ->where('email', $email)
            ->first();
    }

    public function findById(int $id): ?User
    {
        return User::query()->find($id);
    }

    public function create(array $data): User
    {
        return User::query()->create($data);
    }

    public function update(User $user, array $data): User
    {
        $user->update($data);

        return $user->fresh();
    }

    public function delete(User $user): void
    {
        $user->delete();
    }
}
