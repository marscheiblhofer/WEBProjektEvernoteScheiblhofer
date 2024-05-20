<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\NoteListController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/auth/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['api', 'auth.jwt', 'auth.admin']], function () {
    Route::get('/notelists', [NoteListController::class, 'index']);
    Route::get('/notelists/{id}', [NoteListController::class, 'findByID']);
    Route::post('/notelists', [NoteListController::class, 'save']);
    Route::put('/notelists/{id}', [NoteListController::class, 'update']);
    Route::delete('/notelists/{id}', [NoteListController::class, 'delete']);

    Route::put('/notelists/user/{id}', [NoteListController::class, 'addUser']);

    Route::get('/notes', [NoteController::class, 'index']);
    Route::get('/notes/{id}', [NoteController::class, 'findByID']);
    Route::get('/notes/search/{searchTerm}', [NoteController::class, 'findBySearchTerm']);
    Route::post('/notes', [NoteController::class, 'save']);
    Route::put('/notes/{id}', [NoteController::class, 'update']);
    Route::delete('/notes/{id}', [NoteController::class, 'delete']);

    Route::get('/todos', [TodoController::class, 'index']);
    Route::get('/todos/{id}', [TodoController::class, 'findByID']);
    Route::post('/todos', [TodoController::class, 'save']);
    Route::put('/todos/{id}', [TodoController::class, 'update']);
    Route::delete('/todos/{id}', [TodoController::class, 'delete']);

    Route::get('/user/search/{searchTerm}', [UserController::class, 'findEmailBySearchTerm']);
    Route::get('/user', [UserController::class, 'index']);

    Route::post('auth/logout', [AuthController::class,'logout']);
});
