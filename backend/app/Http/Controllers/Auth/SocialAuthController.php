<?php

namespace App\Http\Controllers\Auth;

use App\DTOs\Auth\SocialAuthDTO;
use App\Http\Controllers\Controller;
use App\Services\Auth\AuthService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    public function __construct(
        private readonly AuthService $authService,
    ) {}

    public function redirectToGoogle(): RedirectResponse
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function handleGoogleCallback(): RedirectResponse
    {
        $socialUser = Socialite::driver('google')->stateless()->user();
        $dto        = SocialAuthDTO::fromSocialiteUser($socialUser, 'google');
        $frontend   = config('app.frontend_url', config('app.url'));

        $user = $this->authService->findSocialUser($dto);

        if ($user) {
            auth()->login($user);
            session()->regenerate();
            return redirect($frontend . '/home');
        }

        return redirect($frontend . '/auth/complete-profile')
            ->cookie('social_auth_data', json_encode([
                'provider'    => $dto->provider,
                'provider_id' => $dto->providerId,
                'first_name'  => $dto->firstName,
                'last_name'   => $dto->lastName,
                'email'       => $dto->email,
                'avatar'      => $dto->avatar,
            ]), 60, '/', null, config('session.secure'), true);
    }

    public function redirectToFacebook(): RedirectResponse
    {
        return Socialite::driver('facebook')->stateless()->redirect();
    }

    public function handleFacebookCallback(Request $request): RedirectResponse
    {
        $frontend = config('app.frontend_url', config('app.url'));

        if ($request->has('error') || ! $request->has('code')) {
            $msg = $request->input('error_description', 'Facebook authentication failed');
            return redirect($frontend . '/callback?error=' . urlencode($msg));
        }

        try {
            $socialUser = Socialite::driver('facebook')->stateless()->user();
            $dto        = SocialAuthDTO::fromSocialiteUser($socialUser, 'facebook');

            $user = $this->authService->findSocialUser($dto);

            if ($user) {
                auth()->login($user);
                session()->regenerate();
                return redirect($frontend . '/home');
            }

            $emailRequired = ! $dto->email ? '&email_required=true' : '';

            return redirect($frontend . '/auth/complete-profile' . $emailRequired)
                ->cookie('social_auth_data', json_encode([
                    'provider'    => $dto->provider,
                    'provider_id' => $dto->providerId,
                    'first_name'  => $dto->firstName,
                    'last_name'   => $dto->lastName,
                    'email'       => $dto->email,
                    'avatar'      => $dto->avatar,
                ]), 60, '/', null, config('session.secure'), true);
        } catch (\Exception) {
            return redirect($frontend . '/callback?error=' . urlencode('Facebook authentication failed'));
        }
    }
}
