<?php

namespace App\Http\Controllers\Report;

use App\DTOs\Report\CreateReportDTO;
use App\DTOs\Report\UpdateReportDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReportRequest;
use App\Http\Requests\UpdateReportRequest;
use App\Http\Resources\ReportResource;
use App\Models\Report;
use App\Repositories\ReportRepository;
use App\Services\Report\ReportService;
use Illuminate\Http\JsonResponse;

class ReportController extends Controller
{
    public function __construct(
        private readonly ReportService $service,
        private readonly ReportRepository $repository,
    ) {}

    public function index(): JsonResponse
    {
        return response()->json([
            'data' => ReportResource::collection($this->repository->all(auth()->id())),
        ]);
    }

    public function show(Report $report): JsonResponse
    {
        $report = $this->repository->find($report->id, auth()->id());

        return response()->json([
            'data' => new ReportResource($report),
        ]);
    }

    public function store(StoreReportRequest $request): JsonResponse
    {
        $dto = new CreateReportDTO(
            userId:   $request->user()->id,
            category: $request->validated('category'),
            type:     $request->validated('type'),
            status:   $request->validated('status'),
            lat:      $request->validated('location.lat'),
            lng:     $request->validated('location.lng'),
        );

        $report = $this->service->create($dto, $request->file('images', []));

        return response()->json([
            'message' => 'Report created.',
        ], 201);
    }

    public function update(UpdateReportRequest $request, Report $report): JsonResponse
    {
        $this->authorize('update', $report);

        $dto = new UpdateReportDTO(
            category: $request->validated('category'),
            type:     $request->validated('type'),
            status:   $request->validated('status'),
            lat:      $request->validated('location.lat'),
            lng:     $request->validated('location.lng'),
        );

        $updated = $this->service->update($report, $dto, $request->file('images', []));

        return response()->json([
            'message' => 'Report updated.',
        ]);
    }

    public function destroy(Report $report): JsonResponse
    {
        $this->authorize('delete', $report);
        $this->service->delete($report);

        return response()->json(['message' => 'Report deleted.']);
    }
}
