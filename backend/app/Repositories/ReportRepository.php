<?php

namespace App\Repositories;

use App\Models\Report;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class ReportRepository
{
    public function all(?int $userId = null): Collection
    {
        return Report::query()
            ->withCount('supports')
            ->when($userId, fn($q) => $q->with(['supports' => fn($q) => $q->where('user_id', $userId)]))
            ->with('user')
            ->latest()
            ->get();
    }

    public function find(int $id, ?int $userId = null): ?Report
    {
        return Report::query()
            ->withCount('supports')
            ->when($userId, fn($q) => $q->with(['supports' => fn($q) => $q->where('user_id', $userId)]))
            ->with('user')
            ->find($id);
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

    public function support(Report $report, User $user): void
    {
        $report->supports()->syncWithoutDetaching([$user->id]);
    }

    public function unsupport(Report $report, User $user): void
    {
        $report->supports()->detach($user->id);
    }
}
