<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index():JsonResponse
    {
        //$todos = Todo::with(['notelist', 'note', 'responsible_person', 'creator'])->get();
        $todos = Todo::with(['notelist', 'note', 'responsible_person', 'creator'])->get();
        return response()->json($todos, 200);
    }

    public function findByID(string $id):JsonResponse
    {
        $todo = Todo::where('id', $id)->with(['notelist', 'note', 'responsible_person', 'creator'])->get()->first();
        return $todo!=null ? response()->json($todo, 200) : response()->json(null, 200);
    }
}
