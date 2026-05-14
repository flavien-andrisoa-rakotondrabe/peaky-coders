<?php

namespace App\Http\Controllers\Report;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Services\Report\ReportService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReportSupportController extends Controller
{
    public function __construct(
        private readonly ReportService $service,
    ) {}

    public function store(Report $report, Request $request): JsonResponse
    {
        $result = $this->service->toggleSupport($report, $request->user());

        $message = $result['is_supported'] ? 'Report supporté.' : 'Support retiré.';

        return response()->json([
            'message' => $message,
            'data'    => $result,
        ]);
    }
}
