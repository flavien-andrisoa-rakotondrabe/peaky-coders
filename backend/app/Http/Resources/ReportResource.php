<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ReportResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'            => $this->id,
            'citizen'       => new CitizenResource($this->whenLoaded('citizen')),
            'category'      => $this->category,
            'type'          => $this->type,
            'status'        => $this->status,
            'image_url'     => $this->image ? Storage::url($this->image) : null,
            'latitude'      => $this->latitude,
            'longitude'     => $this->longitude,
            'location_name' => $this->location_name,
            'created_at'    => $this->created_at,
            'updated_at'    => $this->updated_at,
        ];
    }
}
