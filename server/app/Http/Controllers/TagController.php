<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index($searchTerm): JsonResponse
    {
        $categories = Category::with(['notes'])
        ->where('id', $searchTerm)
            ->withWhereHas('notes.notelist', function ($query) {
                $query->where('creator_id', auth()->id());
            })
            ->orWhereHas('notes.notelist.user', function ($query) {
                $query->where('id', auth()->id());
            })
            ->get();

        return response()->json($categories, 200);
    }

    public function findCategoryBySearchTerm(string $searchTerm):JsonResponse
    {
        $searchCategory = Category::where('category', 'LIKE', '%'.$searchTerm.'%')
            ->get();
        return response()->json($searchCategory, 200);
    }
}
