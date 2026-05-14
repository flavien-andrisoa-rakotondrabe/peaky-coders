<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'token', 'expires_at'])]
class Citizen extends Model implements AuthenticatableContract
{
    use Authenticatable;

    protected function casts(): array
    {
        return [
            'expires_at' => 'datetime',
        ];
    }

    public function getAuthIdentifierName(): string
    {
        return 'id';
    }

    public function getAuthPassword(): string
    {
        return '';
    }

    public function reports()
    {
        return $this->hasMany(Report::class);
    }

    public function articles()
    {
        return $this->hasMany(Article::class);
    }
}
