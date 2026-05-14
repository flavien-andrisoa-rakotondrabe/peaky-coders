<?php

namespace App\Policies;

use App\Models\Article;
use App\Models\Citizen;

class ArticlePolicy
{
    public function update(Citizen $citizen, Article $article): bool
    {
        return (int) $citizen->id === (int) $article->citizen_id;
    }

    public function delete(Citizen $citizen, Article $article): bool
    {
        return (int) $citizen->id === (int) $article->citizen_id;
    }
}
