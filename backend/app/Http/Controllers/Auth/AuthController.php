<?php

namespace App\Http\Controllers\Auth;

use App\DTOs\Auth\LoginDTO;
use App\DTOs\Auth\RegisterDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\CompleteProfileRequest;
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
        $dto = RegisterDTO::fromArray($request->validated());
        $result = $this->authService->register($dto);

        return response()->json([
            'message' => 'Compte créé avec succès.',
            'data' => [
                'access_token' => $result->accessToken,
                'token_type' => $result->tokenType,
                'user' => new UserResource($result->user),
            ],
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $dto = LoginDTO::fromArray($request->validated());
        $result = $this->authService->login($dto);

        return response()->json([
            'message' => 'Connexion réussie.',
            'data' => [
                'access_token' => $result->accessToken,
                'token_type' => $result->tokenType,
                'user' => new UserResource($result->user),
            ],
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $this->authService->logout($request->user());

        return response()->json(['message' => 'Déconnexion réussie.']);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'data' => new UserResource($request->user()),
        ]);
    }

    public function completeProfile(CompleteProfileRequest $request): JsonResponse
    {
        $result = $this->authService->completeProfile($request->user(), $request->validated());

        return response()->json([
            'message' => 'Profil complété avec succès.',
            'data' => [
                'access_token' => $result->accessToken,
                'token_type'   => $result->tokenType,
                'user'         => new UserResource($result->user),
            ],
        ]);
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
