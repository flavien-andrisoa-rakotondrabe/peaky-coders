<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['title', 'description', 'images', 'latitude', 'longitude', 'location_name', 'type', 'citizen_id', 'date'])]
class Article extends Model
{
    protected function casts(): array
    {
        return [
            'latitude' => 'float',
            'longitude' => 'float',
            'date'     => 'date:Y-m-d',
            'images'   => 'array',
        ];
    }
    public function citizen()
    {
        return $this->belongsTo(Citizen::class);
    }
}
