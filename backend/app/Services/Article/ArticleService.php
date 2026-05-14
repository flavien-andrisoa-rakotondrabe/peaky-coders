<?php

namespace App\Services\Article;

use App\DTOs\Article\CreateArticleDTO;
use App\DTOs\Article\UpdateArticleDTO;
use App\Models\Article;
use App\Repositories\ArticleRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ArticleService
{
    public function __construct(
        private readonly ArticleRepository $repository,
    ) {}

    public function create(CreateArticleDTO $dto, array $images): Article
    {
        $imagePaths = collect($images)
            ->map(fn(UploadedFile $file) => $file->store('articles', 'public'))
            ->values()
            ->toArray();

        return $this->repository->create([
            'citizen_id'    => $dto->citizenId,
            'type'          => $dto->type,
            'date'          => $dto->date,
            'title'         => $dto->title,
            'description'   => $dto->description,
            'images'        => $imagePaths ?: null,
            'latitude'      => $dto->latitude,
            'longitude'     => $dto->longitude,
            'location_name' => $dto->locationName,
        ]);
    }

    public function update(Article $article, UpdateArticleDTO $dto, array $images): Article
    {
        if (!empty($images)) {
            foreach ($article->images ?? [] as $path) {
                Storage::disk('public')->delete($path);
            }
            $imagePaths = collect($images)
                ->map(fn(UploadedFile $file) => $file->store('articles', 'public'))
                ->values()
                ->toArray();
        } else {
            $imagePaths = $article->images;
        }

        return $this->repository->update($article, [
            'type'          => $dto->type ?? $article->type,
            'date'          => $dto->date ?? $article->date,
            'title'         => $dto->title ?? $article->title,
            'description'   => $dto->description ?? $article->description,
            'images'        => $imagePaths,
            'latitude'      => $dto->latitude ?? $article->latitude,
            'longitude'     => $dto->longitude ?? $article->longitude,
            'location_name' => $dto->locationName ?? $article->location_name,
        ]);
    }

    public function delete(Article $article): void
    {
        foreach ($article->images ?? [] as $path) {
            Storage::disk('public')->delete($path);
        }

        $this->repository->delete($article);
    }
}
