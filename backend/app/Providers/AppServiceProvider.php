<?php

namespace App\Providers;

use App\Auth\CitizenTokenGuard;
use App\Repositories\CitizenRepository;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void {}

    public function boot(): void
    {
        ResetPassword::createUrlUsing(function (object $notifiable, string $token): string {
            $frontend = config('app.frontend_url', config('app.url'));

            return $frontend
                . '/reset-password?token=' . $token
                . '&email=' . urlencode($notifiable->getEmailForPasswordReset());
        });

        Auth::extend('citizen-token', function ($app, $name, array $config) {
            return new CitizenTokenGuard(
                $app->make(CitizenRepository::class),
                $app->make(Request::class),
            );
        });
    }
}
