<?php

use App\Http\Controllers\Article\ArticleController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\SocialAuthController;
use App\Http\Controllers\Citizen\CitizenController;
use App\Http\Controllers\Profile\ProfileController;
use App\Http\Controllers\Report\ReportController;
use Illuminate\Support\Facades\Route;
/*
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
*/
// Citizen
Route::post('citizens', [CitizenController::class, 'store'])->name('citizens.store');
Route::middleware('auth:citizen')->group(function (): void {
    Route::get('citizens/me', [CitizenController::class, 'me'])->name('citizens.me');
});

// Reports
Route::get('reports', [ReportController::class, 'index'])->name('reports.index');
Route::get('reports/{report}', [ReportController::class, 'show'])->name('reports.show');
Route::middleware('auth:citizen')->group(function (): void {
    Route::post('reports', [ReportController::class, 'store'])->name('reports.store');
    Route::post('reports/{report}', [ReportController::class, 'update'])->name('reports.update');
    Route::delete('reports/{report}', [ReportController::class, 'destroy'])->name('reports.destroy');
});

// Articles
Route::get('news', [ArticleController::class, 'index'])->name('news.index');
Route::get('news/{article}', [ArticleController::class, 'show'])->name('news.show');
Route::middleware('auth:citizen')->group(function (): void {
    Route::post('news', [ArticleController::class, 'store'])->name('news.store');
    Route::post('news/{article}', [ArticleController::class, 'update'])->name('news.update');
    Route::delete('news/{article}', [ArticleController::class, 'destroy'])->name('news.destroy');
});
