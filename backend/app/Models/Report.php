<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['citizen_id', 'category', 'type', 'status', 'images', 'latitude', 'longitude', 'location_name'])]
class Report extends Model
{
    protected function casts(): array
    {
        return [
            'latitude' => 'float',
            'longitude' => 'float',
            'images'   => 'array',
        ];
    }
    public function citizen()
    {
        return $this->belongsTo(Citizen::class);
    }
}
