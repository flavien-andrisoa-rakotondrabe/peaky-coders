<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['title', 'description', 'image', 'latitude', 'longitude', 'location_name', 'type', 'citizen_id'])]
class Article extends Model
{
    protected function casts(): array
    {
        return [
            'latitude' => 'float',
            'longitude' => 'float',
        ];
    }
    public function citizen()
    {
        return $this->belongsTo(Citizen::class);
    }
}
