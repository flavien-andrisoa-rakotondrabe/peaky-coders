<?php

namespace App\Services\News;

use App\DTOs\News\CreateNewsDTO;
use App\DTOs\News\UpdateNewsDTO;
use App\Models\News;
use App\Repositories\NewsRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class NewsService
{
    public function __construct(
        private readonly NewsRepository $repository,
    ) {}

    public function create(CreateNewsDTO $dto, array $images): News
    {
        $imagePaths = collect($images)
            ->map(fn(UploadedFile $file) => $file->store('news', 'public'))
            ->values()
            ->toArray();

        return $this->repository->create([
            'user_id'     => $dto->userId,
            'type'        => $dto->type,
            'date'        => $dto->date,
            'title'       => $dto->title,
            'description' => $dto->description,
            'images'      => $imagePaths ?: null,
            'latitude'    => $dto->lat,
            'longitude'   => $dto->lng,
        ]);
    }

    public function update(News $news, UpdateNewsDTO $dto, array $images): News
    {
        if (!empty($images)) {
            foreach ($news->images ?? [] as $path) {
                Storage::disk('public')->delete($path);
            }
            $imagePaths = collect($images)
                ->map(fn(UploadedFile $file) => $file->store('news', 'public'))
                ->values()
                ->toArray();
        } else {
            $imagePaths = $news->images;
        }

        return $this->repository->update($news, [
            'type'          => $dto->type ?? $news->type,
            'date'          => $dto->date ?? $news->date,
            'title'         => $dto->title ?? $news->title,
            'description'   => $dto->description ?? $news->description,
            'images'        => $imagePaths,
            'latitude'  => $dto->lat ?? $news->latitude,
            'longitude' => $dto->lng ?? $news->longitude,
        ]);
    }

    public function delete(News $news): void
    {
        foreach ($news->images ?? [] as $path) {
            Storage::disk('public')->delete($path);
        }

        $this->repository->delete($news);
    }
}
