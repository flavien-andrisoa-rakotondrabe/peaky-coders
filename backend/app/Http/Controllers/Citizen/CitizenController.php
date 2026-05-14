<?php

namespace App\Http\Controllers\Citizen;

use App\DTOs\Citizen\CreateCitizenDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCitizenRequest;
use App\Http\Resources\CitizenResource;
use App\Services\Citizen\CitizenService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CitizenController extends Controller
{
    public function __construct(
        private readonly CitizenService $service,
    ) {}

    public function store(StoreCitizenRequest $request): JsonResponse
    {
        $citizen = $this->service->register(
            CreateCitizenDTO::fromArray($request->validated()),
        );

        return response()->json([
            'message' => 'Citizen registered.',
            'data'    => [
                'citizen' => new CitizenResource($citizen),
                'token'   => $citizen->token,
            ],
        ], 201);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'data' => new CitizenResource($request->user()),
        ]);
    }
}
