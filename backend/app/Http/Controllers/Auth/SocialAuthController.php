<?php

namespace App\Http\Controllers\Auth;

use App\DTOs\Auth\SocialAuthDTO;
use App\Http\Controllers\Controller;
use App\Services\Auth\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    public function __construct(
        private readonly AuthService $authService,
    ) {}

    public function redirectToGoogle(): JsonResponse
    {
        $url = Socialite::driver('google')->stateless()->redirect()->getTargetUrl();

        return response()->json(['redirect_url' => $url]);
    }

    public function handleGoogleCallback(): RedirectResponse
    {
        $googleUser = Socialite::driver('google')->stateless()->user();
        $dto = SocialAuthDTO::fromSocialiteUser($googleUser);
        $result = $this->authService->handleGoogleCallback($dto);

        $frontend = config('app.frontend_url', config('app.url'));

        return redirect($frontend . '/auth/callback?token=' . $result->accessToken);
    }
}
