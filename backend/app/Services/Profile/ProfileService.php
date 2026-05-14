<?php

namespace App\Services\Profile;

use App\DTOs\Profile\UpdateProfileDTO;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Hash;

class ProfileService
{
    public function __construct(
        private readonly UserRepository $userRepository,
    ) {}

    public function delete(User $user): void
    {
        $user->tokens()->delete();
        $this->userRepository->delete($user);
    }

    public function update(User $user, UpdateProfileDTO $dto): User
    {
        $data = array_filter([
            'name'   => $dto->name,
            'email'  => $dto->email,
            'phone'  => $dto->phone,
            'avatar' => $dto->avatar,
        ], fn ($value) => $value !== null);

        if ($dto->newPassword !== null) {
            if ($user->google_id !== null || $user->facebook_id !== null) {
                throw new HttpResponseException(response()->json([
                    'message' => 'Les comptes Google ne peuvent pas modifier leur mot de passe ici.',
                ], 422));
            }

            if (!Hash::check($dto->currentPassword, $user->password)) {
                throw new HttpResponseException(response()->json([
                    'message' => 'Le mot de passe actuel est incorrect.',
                ], 422));
            }

            $data['password'] = Hash::make($dto->newPassword);
        }

        return $this->userRepository->update($user, $data);
    }
}
