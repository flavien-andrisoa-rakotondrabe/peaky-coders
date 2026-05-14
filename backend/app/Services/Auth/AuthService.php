<?php

namespace App\Services\Auth;

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

    public function login(LoginDTO $dto): User
    {
        $user = $this->userRepository->findByEmail($dto->email);

        if (! $user || ! Hash::check($dto->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => [__('auth.failed')],
            ]);
        }

        return $user;
    }

    public function findSocialUser(SocialAuthDTO $dto): ?User
    {
        $idField = $dto->provider === 'google' ? 'google_id' : 'facebook_id';

        $user = match ($dto->provider) {
            'google'   => $this->userRepository->findByGoogleId($dto->providerId),
            'facebook' => $this->userRepository->findByFacebookId($dto->providerId),
            default    => null,
        } ?? ($dto->email ? $this->userRepository->findByEmail($dto->email) : null);

        if ($user && ! $user->{$idField}) {
            $this->userRepository->update($user, [$idField => $dto->providerId]);
            $user = $user->fresh();
        }

        return $user;
    }

    public function createSocialUser(SocialAuthDTO $dto, string $phone, ?string $email, ?string $password): User
    {
        $idField    = $dto->provider === 'google' ? 'google_id' : 'facebook_id';
        $userEmail  = $dto->email ?? $email;

        $user = $this->userRepository->create([
            'first_name'        => $dto->firstName,
            'last_name'         => $dto->lastName,
            'name'              => $dto->firstName . ' ' . $dto->lastName,
            'email'             => $userEmail,
            $idField            => $dto->providerId,
            'avatar'            => $dto->avatar,
            'email_verified_at' => now(),
            'profile_completed' => true,
            'phone'             => $phone,
            'password'          => $password ? Hash::make($password) : null,
        ]);

        if ($userEmail) {
            Mail::to($userEmail)->send(new WelcomeEmail($user));
        }

        return $user;
    }

    public function logout(): void
    {
        auth()->logout();
        session()->invalidate();
        session()->regenerateToken();
    }

    public function sendPasswordResetLink(string $email): string
    {
        return Password::sendResetLink(['email' => $email]);
    }

    public function resetPassword(string $token, string $email, string $password): string
    {
        return Password::reset(
            credentials: [
                'token'    => $token,
                'email'    => $email,
                'password' => $password,
            ],
            callback: function ($user, string $password): void {
                $user->forceFill([
                    'password'       => Hash::make($password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            },
        );
    }
}
