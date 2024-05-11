<?php

use App\Http\Controllers\NoteController;
use App\Http\Controllers\NoteListController;
use App\Http\Controllers\TodoController;
use App\Models\Notelist;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/notelists', [NoteListController::class, "index"]);

Route::get('/notelists/{id}', function ($id) {
    $notelist = Notelist::find($id);
    return view('notelists.show', compact('notelist'));
});

Route::get('/notes', [NoteController::class, "index"]);
Route::get('/todos', [TodoController::class, 'index']);
