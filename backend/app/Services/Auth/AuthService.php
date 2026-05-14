<?php

namespace App\Services\Auth;

use App\DTOs\Auth\AuthResponseDTO;
use App\DTOs\Auth\LoginDTO;
use App\DTOs\Auth\RegisterDTO;
use App\DTOs\Auth\SocialAuthDTO;
use App\Mail\WelcomeEmail;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function __construct(
        private readonly UserRepository $userRepository,
    ) {}

    public function register(RegisterDTO $dto): User
    {
        $user = $this->userRepository->create([
            'first_name'        => $dto->firstName,
            'last_name'         => $dto->lastName,
            'name'              => $dto->firstName . ' ' . $dto->lastName,
            'email'             => $dto->email,
            'phone'             => $dto->phone,
            'password'          => Hash::make($dto->password),
            'profile_completed' => true,
        ]);

        Mail::to($user->email)->send(new WelcomeEmail($user));

        return $user;
    }

    public function login(LoginDTO $dto): AuthResponseDTO
    {
        $user = $this->userRepository->findByEmail($dto->email);

        if (! $user || ! Hash::check($dto->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => [__('auth.failed')],
            ]);
        }

        auth()->login($user);

        return new AuthResponseDTO(
            user: $user,
        );
    }

    public function handleSocialCallback(SocialAuthDTO $dto): AuthResponseDTO
    {
        $idField = $dto->provider === 'google' ? 'google_id' : 'facebook_id';

        $user = match ($dto->provider) {
            'google'   => $this->userRepository->findByGoogleId($dto->providerId),
            'facebook' => $this->userRepository->findByFacebookId($dto->providerId),
            default    => null,
        } ?? ($dto->email ? $this->userRepository->findByEmail($dto->email) : null);

        if ($user) {
            if (! $user->{$idField}) {
                $this->userRepository->update($user, [$idField => $dto->providerId]);
                $user = $user->fresh();
            }
        } else {
            $user = $this->userRepository->create([
                'first_name'        => $dto->firstName,
                'last_name'         => $dto->lastName,
                'name'              => $dto->firstName . ' ' . $dto->lastName,
                'email'             => $dto->email,
                $idField            => $dto->providerId,
                'avatar'            => $dto->avatar,
                'email_verified_at' => now(),
                'profile_completed' => false,
            ]);

            if ($user->email) {
                Mail::to($user->email)->send(new WelcomeEmail($user));
            }
        }

        $token = $user->createToken(
            name: 'auth_token',
            abilities: ['*'],
            expiresAt: now()->addDay(),
        )->plainTextToken;

        return new AuthResponseDTO(user: $user);
    }

    public function completeProfile(User $user, array $data): User
    {
        $needsWelcomeEmail = $user->email === null && ! empty($data['email']);

        $update = [
            'phone'             => $data['phone'],
            'profile_completed' => true,
        ];

        if (! empty($data['email'])) {
            $update['email']             = $data['email'];
            $update['email_verified_at'] = now();
        }

        if (! empty($data['password'])) {
            $update['password'] = Hash::make($data['password']);
        }

        $this->userRepository->update($user, $update);
        $user = $user->fresh();

        if ($needsWelcomeEmail) {
            Mail::to($user->email)->send(new WelcomeEmail($user));
        }

        return $user;
    }

    public function logout(User $user): void
    {
        $user->currentAccessToken()->delete();
    }

    public function sendPasswordResetLink(string $email): string
    {
        return Password::sendResetLink(['email' => $email]);
    }

    public function resetPassword(string $token, string $email, string $password): string
    {
        return Password::reset(
            credentials: [
                'token' => $token,
                'email' => $email,
                'password' => $password,
            ],
            callback: function ($user, string $password): void {
                $user->forceFill([
                    'password' => Hash::make($password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            },
        );
    }

    private function resolveExpiration(bool $rememberMe): \DateTimeInterface
    {
        return $rememberMe ? now()->addYear() : now()->addDay();
    }
}
