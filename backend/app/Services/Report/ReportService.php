<?php

namespace App\Services\Report;

use App\DTOs\Report\CreateReportDTO;
use App\DTOs\Report\UpdateReportDTO;
use App\Models\Report;
use App\Models\User;
use App\Repositories\ReportRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ReportService
{
    public function __construct(
        private readonly ReportRepository $repository,
    ) {}

    public function create(CreateReportDTO $dto, array $images): Report
    {
        $imagePaths = collect($images)
            ->map(fn(UploadedFile $file) => $file->store('reports', 'public'))
            ->values()
            ->toArray();

        return $this->repository->create([
            'user_id'       => $dto->userId,
            'category'      => $dto->category,
            'type'          => $dto->type,
            'status'        => $dto->status,
            'images'        => $imagePaths ?: null,
            'latitude'  => $dto->lat,
            'longitude' => $dto->lng,
        ]);
    }

    public function update(Report $report, UpdateReportDTO $dto, array $images): Report
    {
        if (!empty($images)) {
            foreach ($report->images ?? [] as $path) {
                Storage::disk('public')->delete($path);
            }
            $imagePaths = collect($images)
                ->map(fn(UploadedFile $file) => $file->store('reports', 'public'))
                ->values()
                ->toArray();
        } else {
            $imagePaths = $report->images;
        }

        return $this->repository->update($report, [
            'category'      => $dto->category ?? $report->category,
            'type'          => $dto->type ?? $report->type,
            'status'        => $dto->status ?? $report->status,
            'images'        => $imagePaths,
            'latitude'  => $dto->lat ?? $report->latitude,
            'longitude' => $dto->lng ?? $report->longitude,
        ]);
    }

    public function delete(Report $report): void
    {
        foreach ($report->images ?? [] as $path) {
            Storage::disk('public')->delete($path);
        }

        $this->repository->delete($report);
    }

    public function toggleSupport(Report $report, User $user): array
    {
        $isSupported = $report->supports()->where('user_id', $user->id)->exists();

        if ($isSupported) {
            $this->repository->unsupport($report, $user);
            $isSupported = false;
        } else {
            $this->repository->support($report, $user);
            $isSupported = true;
        }

        return [
            'supports_count' => $report->supports()->count(),
            'is_supported'   => $isSupported,
        ];
    }
}
