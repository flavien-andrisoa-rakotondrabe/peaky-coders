<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class NewsResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'            => $this->id,
            'user'          => new UserSummaryResource($this->whenLoaded('user')),
            'type'          => $this->type,
            'date'          => $this->date?->format('Y-m-d'),
            'title'         => $this->title,
            'description'   => $this->description,
            'image_urls'    => collect($this->images ?? [])->map(fn($p) => Storage::url($p))->values(),
            'location'      => [
                'lat'  => $this->latitude,
                'lng' => $this->longitude,
            ],
            'created_at'    => $this->created_at,
            'updated_at'    => $this->updated_at,
        ];
    }
}
