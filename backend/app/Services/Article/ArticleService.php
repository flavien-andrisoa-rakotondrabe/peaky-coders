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

    public function create(CreateArticleDTO $dto, ?UploadedFile $image): Article
    {
        $imagePath = $image ? $image->store('articles', 'public') : null;

        return $this->repository->create([
            'citizen_id'    => $dto->citizenId,
            'type'          => $dto->type,
            'title'         => $dto->title,
            'description'   => $dto->description,
            'image'         => $imagePath,
            'latitude'      => $dto->latitude,
            'longitude'     => $dto->longitude,
            'location_name' => $dto->locationName,
        ]);
    }

    public function update(Article $article, UpdateArticleDTO $dto, ?UploadedFile $image): Article
    {
        $imagePath = $image
            ? $image->store('articles', 'public')
            : $article->image;

        return $this->repository->update($article, [
            'type'          => $dto->type ?? $article->type,
            'title'         => $dto->title ?? $article->title,
            'description'   => $dto->description ?? $article->description,
            'image'         => $imagePath,
            'latitude'      => $dto->latitude ?? $article->latitude,
            'longitude'     => $dto->longitude ?? $article->longitude,
            'location_name' => $dto->locationName ?? $article->location_name,
        ]);
    }

    public function delete(Article $article): void
    {
        if ($article->image) {
            Storage::disk('public')->delete($article->image);
        }

        $this->repository->delete($article);
    }
}
