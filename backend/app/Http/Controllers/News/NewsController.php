<?php

namespace App\Http\Controllers\News;

use App\DTOs\News\CreateNewsDTO;
use App\DTOs\News\UpdateNewsDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNewsRequest;
use App\Http\Requests\UpdateNewsRequest;
use App\Http\Resources\NewsResource;
use App\Models\News;
use App\Repositories\NewsRepository;
use App\Services\News\NewsService;
use Illuminate\Http\JsonResponse;

class NewsController extends Controller
{
    public function __construct(
        private readonly NewsService $service,
        private readonly NewsRepository $repository,
    ) {}

    public function index(): JsonResponse
    {
        return response()->json([
            NewsResource::collection($this->repository->all()),
        ]);
    }

    public function show(News $news): JsonResponse
    {
        $news->load('user');

        return response()->json([
            new NewsResource($news),
        ]);
    }

    public function store(StoreNewsRequest $request): JsonResponse
    {
        $dto = new CreateNewsDTO(
            userId: $request->user()->id,
            type: $request->validated('type'),
            date: $request->validated('date'),
            title: $request->validated('title'),
            description: $request->validated('description'),
            lat: $request->validated('location.lat'),
            lng: $request->validated('location.lng'),
        );

        $news = $this->service->create($dto, $request->file('images', []));

        return response()->json([
            'message' => 'News created.',
        ], 201);
    }

    public function update(UpdateNewsRequest $request, News $news): JsonResponse
    {
        $this->authorize('update', $news);

        $dto = new UpdateNewsDTO(
            type: $request->validated('type'),
            date: $request->validated('date'),
            title: $request->validated('title'),
            description: $request->validated('description'),
            lat: $request->validated('location.lat'),
            lng: $request->validated('location.lng'),
        );

        $updated = $this->service->update($news, $dto, $request->file('images', []));

        return response()->json([
            'message' => 'News updated.',
        ]);
    }

    public function destroy(News $news): JsonResponse
    {
        $this->authorize('delete', $news);
        $this->service->delete($news);

        return response()->json(['message' => 'News deleted.']);
    }
}
