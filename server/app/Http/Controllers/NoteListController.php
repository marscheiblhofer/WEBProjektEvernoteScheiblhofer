<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\Notelist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NoteListController extends Controller
{
    public function index():JsonResponse
    {
        //Eager Loading
        $notelists = Notelist::with(['creator', 'notes'])->get();
        return response()->json($notelists, 200);
    }

    public function findByID(string $id):JsonResponse
    {
        $notelist = Notelist::where('id', $id)->with(['creator','notes'])->get()->first();
        return $notelist!=null ? response()->json($notelist, 200) : response()->json(null, 200);
    }

    public function save(Request $request):JsonResponse
    {
        DB::beginTransaction();
        try {
            $notelist = Notelist::create($request->all());
            $notelist->visibility = 0;
            //TODO: creator_id?
            DB::commit();
            return response()->json($notelist, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("saving notelist failed ".$e->getMessage(), 420);
        }
    }

    public function update(Request $request, string $id):JsonResponse
    {
        DB::beginTransaction();
        try {
            $notelist = Notelist::with(['creator','user'])
                ->where('id', $id)->first();
            if($notelist != null) {
                $notelist->update($request->all());
                $notelist->save();

                if($notelist->visibility) { //public notelist
                    $creator_ids = [];
                    if(isset($request['user']) && is_array($request['user'])) {
                        foreach ($request['user'] as $u) {
                            array_push($creator_ids, $u['id']);
                        }
                    }
                    $notelist->user()->sync($creator_ids);
                } else { //not public notelist
                    $notelist->user()->delete();
                }
            }

            DB::commit();
            $notelist1 = Notelist::with(['creator','user'])
                ->where('id', $id)->first();
            return response()->json($notelist1, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("updating note failed ".$e->getMessage(), 420);
        }
    }

    public function delete(string $id):JsonResponse {
        $notelist = Notelist::where('id', $id)->first();
        if($notelist != null) {
            $notelist->delete();
            return response()->json('notelist ('.$id.') successfully deleted', 200);
        } else {
            return response()->json('could not delete notelist - it does not exist', 422);
        }
    }

}
