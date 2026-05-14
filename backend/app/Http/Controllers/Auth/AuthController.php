<?php

namespace App\Http\Controllers\Auth;

use App\DTOs\Auth\LoginDTO;
use App\DTOs\Auth\RegisterDTO;
use App\DTOs\Auth\SocialAuthDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\CompleteSocialProfileRequest;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Http\Resources\UserResource;
use App\Services\Auth\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{
    public function __construct(
        private readonly AuthService $authService,
    ) {}

    public function register(RegisterRequest $request): JsonResponse
    {
        $dto  = RegisterDTO::fromArray($request->validated());
        $user = $this->authService->register($dto);

        return response()->json([
            'message' => 'Compte créé avec succès.',
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $dto  = LoginDTO::fromArray($request->validated());
        $user = $this->authService->login($dto);

        auth()->login($user);
        $request->session()->regenerate();

        return response()->json([
            'message' => 'Connexion réussie.',
            'user'    => new UserResource($user),
        ]);
    }

    public function logout(): JsonResponse
    {
        $this->authService->logout();

        return response()->json(['message' => 'Déconnexion réussie.']);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'data' => new UserResource($request->user()),
        ]);
    }

    public function socialMe(Request $request): JsonResponse
    {
        $raw = $request->cookie('social_auth_data');

        if (! $raw) {
            return response()->json(['message' => 'Aucune session sociale active.'], 404);
        }

        $data = json_decode($raw, true);

        return response()->json([
            'first_name'     => $data['first_name'],
            'last_name'      => $data['last_name'],
            'email'          => $data['email'] ?? null,
            'avatar'         => $data['avatar'] ?? null,
            'provider'       => $data['provider'],
            'email_required' => empty($data['email']),
        ]);
    }

    public function completeSocialProfile(CompleteSocialProfileRequest $request): JsonResponse
    {
        $raw = $request->cookie('social_auth_data');

        if (! $raw) {
            return response()->json(['message' => 'Session expirée, recommencez la connexion.'], 422);
        }

        $data = json_decode($raw, true);

        $dto = new SocialAuthDTO(
            provider: $data['provider'],
            providerId: $data['provider_id'],
            firstName: $data['first_name'],
            lastName: $data['last_name'],
            email: $data['email'] ?? null,
            avatar: $data['avatar'] ?? null,
        );

        $user = $this->authService->createSocialUser(
            dto: $dto,
            phone: $request->validated('phone'),
            email: $request->validated('email'),
            password: $request->validated('password'),
        );

        auth()->login($user);
        $request->session()->regenerate();

        return response()->json([
            'message' => 'Compte créé avec succès.',
            'user'    => new UserResource($user),
        ], 201)->withoutCookie('social_auth_data');
    }

    public function forgotPassword(ForgotPasswordRequest $request): JsonResponse
    {
        $status = $this->authService->sendPasswordResetLink($request->validated('email'));

        if ($status !== Password::RESET_LINK_SENT) {
            return response()->json(['message' => __($status)], 422);
        }

        return response()->json(['message' => __($status)]);
    }

    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        $status = $this->authService->resetPassword(
            token: $request->validated('token'),
            email: $request->validated('email'),
            password: $request->validated('password'),
        );

        if ($status !== Password::PASSWORD_RESET) {
            return response()->json(['message' => __($status)], 422);
        }

        return response()->json(['message' => __($status)]);
    }
}
