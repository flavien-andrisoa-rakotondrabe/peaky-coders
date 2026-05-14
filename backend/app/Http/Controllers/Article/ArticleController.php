<?php

namespace App\Http\Controllers\Article;

use App\DTOs\Article\CreateArticleDTO;
use App\DTOs\Article\UpdateArticleDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use App\Repositories\ArticleRepository;
use App\Services\Article\ArticleService;
use Illuminate\Http\JsonResponse;

class ArticleController extends Controller
{
    public function __construct(
        private readonly ArticleService $service,
        private readonly ArticleRepository $repository,
    ) {}

    public function index(): JsonResponse
    {
        return response()->json([
            'data' => ArticleResource::collection($this->repository->all()),
        ]);
    }

    public function show(Article $article): JsonResponse
    {
        $article->load('user');

        return response()->json([
            'data' => new ArticleResource($article),
        ]);
    }

    public function store(StoreArticleRequest $request): JsonResponse
    {
        $dto = new CreateArticleDTO(
            userId: $request->user()->id,
            type: $request->validated('type'),
            date: $request->validated('date'),
            title: $request->validated('title'),
            description: $request->validated('description'),
            latitude: $request->validated('latitude'),
            longitude: $request->validated('longitude'),
            locationName: $request->validated('location_name'),
        );

        $article = $this->service->create($dto, $request->file('images', []));

        return response()->json([
            'message' => 'Article created.',
        ], 201);
    }

    public function update(UpdateArticleRequest $request, Article $article): JsonResponse
    {
        $this->authorize('update', $article);

        $dto = new UpdateArticleDTO(
            type: $request->validated('type'),
            date: $request->validated('date'),
            title: $request->validated('title'),
            description: $request->validated('description'),
            latitude: $request->validated('latitude'),
            longitude: $request->validated('longitude'),
            locationName: $request->validated('location_name'),
        );

        $updated = $this->service->update($article, $dto, $request->file('images', []));

        return response()->json([
            'message' => 'Article updated.',
        ]);
    }

    public function destroy(Article $article): JsonResponse
    {
        $this->authorize('delete', $article);
        $this->service->delete($article);

        return response()->json(['message' => 'Article deleted.']);
    }
}
