<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['citizen_id', 'category', 'type', 'status', 'image', 'latitude', 'longitude', 'location_name'])]
class Report extends Model
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
