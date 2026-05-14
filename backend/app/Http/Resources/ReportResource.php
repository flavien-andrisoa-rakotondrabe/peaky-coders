<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\UserSummaryResource;

class ReportResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'            => $this->id,
            'user'          => new UserSummaryResource($this->whenLoaded('user')),
            'category'      => $this->category,
            'type'          => $this->type,
            'status'        => $this->status,
            'image_urls'    => collect($this->images ?? [])->map(fn($p) => Storage::url($p))->values(),
            'location'       => [
                'lat'  => $this->latitude,
                'long' => $this->longitude,
            ],
            'supports_count' => $this->supports_count ?? 0,
            'is_supported'   => $this->relationLoaded('supports') ? $this->supports->isNotEmpty() : false,
            'created_at'    => $this->created_at,
            'updated_at'    => $this->updated_at,
        ];
    }
}
