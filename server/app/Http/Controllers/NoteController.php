<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Image;
use App\Models\Note;
use App\Models\Notelist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NoteController extends Controller
{
    public function index():JsonResponse
    {
        $notes = Note::with(['images', 'categories'])->get();
        return response()->json($notes, 200);
    }

    public function findByID(string $id):JsonResponse
    {
        $notes = Note::where('id', $id)->with(['images', 'categories','todos'])->get()->first();
        return $notes!=null ? response()->json($notes, 200) : response()->json(null, 200);
    }

    public function findBySearchTerm(string $searchTerm):JsonResponse
    {
        $searchedNotes = Note::with(['images', 'categories'])
            ->where('title', 'LIKE', '%'.$searchTerm.'%')
            ->orWhere('description', 'LIKE', '%'.$searchTerm.'%')
            ->orWhereHas('categories', function ($query) use ($searchTerm){
                $query->where('category','LIKE','%'.$searchTerm.'%');
            })
            ->get();
        return response()->json($searchedNotes, 200);
    }

    public function save(Request $request):JsonResponse
    {
        DB::beginTransaction();
        try {
            $note = Note::create($request->all());
            if(isset($request['images']) && is_array($request['images'])) {
                foreach ($request['images'] as $img) {
                    $image = Image::firstOrNew(['url'=>$img['url'], 'title'=>$img['title']]);
                    $note->images()->save($image);
                }
            }
            if(isset($request['categories']) && is_array($request['categories'])) {
                foreach ($request['categories'] as $cat) {
                    $category = Category::firstOrNew(['category'=>$cat['category']]);
                    $note->categories()->save($category);
                }
            }

            DB::commit();
            return response()->json($note, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("saving note failed ".$e->getMessage(), 420);
        }
    }

    public function update(Request $request, string $id):JsonResponse
    {
        DB::beginTransaction();
        try {
            $note = Note::with(['images', 'categories'])
                ->where('id', $id)->first();
            if($note != null) {
                $note->update($request->all());
                $note->images()->delete();
                if(isset($request['images']) && is_array($request['images'])) {
                    foreach ($request['images'] as $img) {
                        $image = Image::firstOrNew(['url'=>$img['url'], 'title'=>$img['title']]);
                        $note->images()->save($image);
                    }
                }
                $ids = [];
                if(isset($request['categories']) && is_array($request['categories'])) {
                    foreach ($request['categories'] as $cat) {
                        array_push($ids, $cat['id']);
                    }
                }
                $note->categories()->sync($ids);
                $note->save();
            }

            DB::commit();
            $note1 = Note::with('images', 'categories')
                ->where('id', $id)->first();
            return response()->json($note1, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("updating note failed ".$e->getMessage(), 420);
        }
    }

    public function delete(string $id):JsonResponse {
        $note = Note::where('id', $id)->first();
        if($note != null) {
            $note->delete();
            return response()->json('note ('.$id.') successfully deleted', 200);
        } else {
            return response()->json('could not delete note - it does not exist', 422);
        }
    }
}
