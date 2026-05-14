<?php

namespace App\Repositories;

use App\Models\Report;
use Illuminate\Database\Eloquent\Collection;

class ReportRepository
{
    public function all(): Collection
    {
        return Report::query()->with('citizen')->latest()->get();
    }

    public function find(int $id): ?Report
    {
        return Report::query()->with('citizen')->find($id);
    }

    public function create(array $data): Report
    {
        return Report::query()->create($data);
    }

    public function update(Report $report, array $data): Report
    {
        $report->update($data);

        return $report->fresh();
    }

    public function delete(Report $report): void
    {
        $report->delete();
    }
}
