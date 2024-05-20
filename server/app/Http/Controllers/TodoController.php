<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TodoController extends Controller
{
    public function index():JsonResponse
    {
        $todos = Todo::with(['notelist', 'note', 'responsible_person', 'creator'])->get();
        return response()->json($todos, 200);
    }

    public function findByID(string $id):JsonResponse
    {
        $todo = Todo::where('id', $id)->with(['notelist', 'note', 'responsible_person', 'creator'])->get()->first();
        return $todo!=null ? response()->json($todo, 200) : response()->json(null, 200);
    }

    public function save(Request $request):JsonResponse
    {
        if($request->due_date) {
            $date = new \DateTime($request->due_date);
            $request['due_date'] = $date->format('Y-m-d H:i:s');
        } else {
            $request['due_date'] = null;
        }

        DB::beginTransaction();
        try {
            $todo = Todo::create($request->all());
            DB::commit();
            return response()->json($todo, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("saving todo failed ".$e->getMessage(), 420);
        }
    }

    public function update(Request $request, string $id):JsonResponse
    {
        DB::beginTransaction();
        try {
            $todo = Todo::where('id', $id)->first();
            if($todo != null) {
                $todo->update($request->all());
                $todo->save();
            }

            DB::commit();
            $todo1 = Todo::where('id', $id)->first();
            return response()->json($todo1, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("updating todo failed ".$e->getMessage(), 420);
        }
    }

    public function delete(string $id):JsonResponse {
        $todo = Todo::where('id', $id)->first();
        if($todo != null) {
            $todo->delete();
            return response()->json('todo ('.$id.') successfully deleted', 200);
        } else {
            return response()->json('could not delete todo - it does not exist', 422);
        }
    }
}
