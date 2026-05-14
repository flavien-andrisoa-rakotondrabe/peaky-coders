<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\SocialAuthController;
use App\Http\Controllers\Profile\ProfileController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->name('auth.')->group(function (): void {

    // Routes publiques
    Route::post('register', [AuthController::class, 'register'])->name('register');
    Route::post('login', [AuthController::class, 'login'])->name('login');

    // Google OAuth
    Route::prefix('google')->name('google.')->group(function (): void {
        Route::get('redirect', [SocialAuthController::class, 'redirectToGoogle'])->name('redirect');
        Route::get('callback', [SocialAuthController::class, 'handleGoogleCallback'])->name('callback');
    });
    Route::post('forgot-password', [AuthController::class, 'forgotPassword'])->name('forgot-password');
    Route::post('reset-password', [AuthController::class, 'resetPassword'])->name('reset-password');

    // Routes protégées par Sanctum
    Route::middleware('auth:sanctum')->group(function (): void {
        Route::get('me', [AuthController::class, 'me'])->name('me');
        Route::post('logout', [AuthController::class, 'logout'])->name('logout');
    });
});

Route::prefix('profile')->name('profile.')->middleware('auth:sanctum')->group(function (): void {
    Route::patch('/', [ProfileController::class, 'update'])->name('update');
    Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
});
