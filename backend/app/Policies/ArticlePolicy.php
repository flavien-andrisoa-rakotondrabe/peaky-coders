<?php

namespace App\Policies;

use App\Models\Article;
use App\Models\User;

class ArticlePolicy
{
    public function update(User $user, Article $article): bool
    {
        return (int) $user->id === (int) $article->user_id;
    }

    public function delete(User $user, Article $article): bool
    {
        return (int) $user->id === (int) $article->user_id;
    }
}
