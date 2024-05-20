<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(): JsonResponse
    {
        $user = User::where('id', auth()->id())
            ->get();
        return response()->json($user, 200);
    }

    public function findEmailBySearchTerm(string $searchTerm):JsonResponse
    {
        $searchUser = User::where('email', 'LIKE', '%'.$searchTerm.'%')
            ->get();
        return response()->json($searchUser, 200);
    }
}
