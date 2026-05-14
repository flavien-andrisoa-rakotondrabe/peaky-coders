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
        $socialUser = Socialite::driver('google')->stateless()->user();
        $dto = SocialAuthDTO::fromSocialiteUser($socialUser, 'google');
        $result = $this->authService->handleSocialCallback($dto);

        $frontend = config('app.frontend_url', config('app.url'));
        $profileCompleted = $result->user->profile_completed ? 'true' : 'false';

        return redirect($frontend . '/auth/callback?token=' . $result->accessToken . '&profile_completed=' . $profileCompleted);
    }

    public function redirectToFacebook(): JsonResponse
    {
        $url = Socialite::driver('facebook')->stateless()->redirect()->getTargetUrl();

        return response()->json(['redirect_url' => $url]);
    }

    public function handleFacebookCallback(): RedirectResponse
    {
        $socialUser = Socialite::driver('facebook')->stateless()->user();
        $dto = SocialAuthDTO::fromSocialiteUser($socialUser, 'facebook');
        $result = $this->authService->handleSocialCallback($dto);

        $frontend = config('app.frontend_url', config('app.url'));
        $profileCompleted = $result->user->profile_completed ? 'true' : 'false';

        return redirect($frontend . '/auth/callback?token=' . $result->accessToken . '&profile_completed=' . $profileCompleted);
    }
}
