<?php

namespace App\Policies;

use App\Models\News;
use App\Models\User;

class NewsPolicy
{
    public function update(User $user, News $news): bool
    {
        return (int) $user->id === (int) $news->user_id;
    }

    public function delete(User $user, News $news): bool
    {
        return (int) $user->id === (int) $news->user_id;
    }
}
