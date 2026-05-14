<?php

namespace App\Repositories;

use App\Models\News;
use Illuminate\Database\Eloquent\Collection;

class NewsRepository
{
    public function all(): Collection
    {
        return News::query()->with('user')->latest()->get();
    }

    public function find(int $id): ?News
    {
        return News::query()->with('user')->find($id);
    }

    public function create(array $data): News
    {
        return News::query()->create($data);
    }

    public function update(News $news, array $data): News
    {
        $news->update($data);

        return $news->fresh();
    }

    public function delete(News $news): void
    {
        $news->delete();
    }
}
