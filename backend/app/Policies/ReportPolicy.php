<?php

namespace App\Policies;

use App\Models\Report;
use App\Models\User;

class ReportPolicy
{
    public function update(User $user, Report $report): bool
    {
        return (int) $user->id === (int) $report->user_id;
    }

    public function delete(User $user, Report $report): bool
    {
        return (int) $user->id === (int) $report->user_id;
    }
}
