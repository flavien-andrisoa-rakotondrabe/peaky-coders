<?php

namespace App\Repositories;

use App\Models\Article;
use Illuminate\Database\Eloquent\Collection;

class ArticleRepository
{
    public function all(): Collection
    {
        return Article::query()->with('user')->latest()->get();
    }

    public function find(int $id): ?Article
    {
        return Article::query()->with('user')->find($id);
    }

    public function create(array $data): Article
    {
        return Article::query()->create($data);
    }

    public function update(Article $article, array $data): Article
    {
        $article->update($data);

        return $article->fresh();
    }

    public function delete(Article $article): void
    {
        $article->delete();
    }
}
