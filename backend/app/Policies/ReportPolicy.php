<?php

namespace App\Policies;

use App\Models\Citizen;
use App\Models\Report;

class ReportPolicy
{
    public function update(Citizen $citizen, Report $report): bool
    {
        return (int) $citizen->id === (int) $report->citizen_id;
    }

    public function delete(Citizen $citizen, Report $report): bool
    {
        return (int) $citizen->id === (int) $report->citizen_id;
    }
}
