<?php

namespace App\Http\Controllers\Profile;

use App\DTOs\Profile\UpdateProfileDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\DeleteProfileRequest;
use App\Http\Requests\Profile\UpdateProfileRequest;
use App\Http\Resources\UserResource;
use App\Services\Profile\ProfileService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function __construct(
        private readonly ProfileService $profileService,
    ) {}

    public function show(Request $request): JsonResponse
    {
        return response()->json([
            'data' => new UserResource($request->user()),
        ]);
    }

    public function update(UpdateProfileRequest $request): JsonResponse
    {
        $dto = UpdateProfileDTO::fromArray($request->validated());
        $user = $this->profileService->update($request->user(), $dto);

        return response()->json([
            'message' => 'Profil mis à jour avec succès.',
        ]);
    }

    public function destroy(DeleteProfileRequest $request): JsonResponse
    {
        $this->profileService->delete($request->user());

        return response()->json(['message' => 'Compte supprimé avec succès.']);
    }
}
