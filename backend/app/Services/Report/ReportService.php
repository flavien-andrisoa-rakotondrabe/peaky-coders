<?php

namespace App\Services\Report;

use App\DTOs\Report\CreateReportDTO;
use App\DTOs\Report\UpdateReportDTO;
use App\Models\Report;
use App\Repositories\ReportRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ReportService
{
    public function __construct(
        private readonly ReportRepository $repository,
    ) {}

    public function create(CreateReportDTO $dto, ?UploadedFile $image): Report
    {
        $imagePath = $image ? $image->store('reports', 'public') : null;

        return $this->repository->create([
            'citizen_id'    => $dto->citizenId,
            'category'      => $dto->category,
            'type'          => $dto->type,
            'status'        => $dto->status,
            'image'         => $imagePath,
            'latitude'      => $dto->latitude,
            'longitude'     => $dto->longitude,
            'location_name' => $dto->location,
        ]);
    }

    public function update(Report $report, UpdateReportDTO $dto, ?UploadedFile $image): Report
    {
        $imagePath = $image
            ? $image->store('reports', 'public')
            : $report->image;

        return $this->repository->update($report, [
            'category'      => $dto->category ?? $report->category,
            'type'          => $dto->type ?? $report->type,
            'status'        => $dto->status ?? $report->status,
            'image'         => $imagePath,
            'latitude'      => $dto->latitude ?? $report->latitude,
            'longitude'     => $dto->longitude ?? $report->longitude,
            'location_name' => $dto->locationName ?? $report->location_name,
        ]);
    }

    public function delete(Report $report): void
    {
        if ($report->image) {
            Storage::disk('public')->delete($report->image);
        }

        $this->repository->delete($report);
    }
}
