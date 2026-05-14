<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ArticleResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'            => $this->id,
            'citizen'       => new CitizenResource($this->whenLoaded('citizen')),
            'type'          => $this->type,
            'date'          => $this->date?->format('Y-m-d'),
            'title'         => $this->title,
            'description'   => $this->description,
            'image_url'     => $this->image ? Storage::url($this->image) : null,
            'latitude'      => $this->latitude,
            'longitude'     => $this->longitude,
            'location_name' => $this->location_name,
            'created_at'    => $this->created_at,
            'updated_at'    => $this->updated_at,
        ];
    }
}
