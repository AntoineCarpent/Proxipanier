<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\SalesSheetsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::get('/users', [UserController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
Route::get('/users/{id}', [UserController::class, 'show']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);
Route::post('/logout', [UserController::class, 'logout']);

Route::get('/salesSheets', [SalesSheetsController::class, 'index']);
Route::post('/salesSheets', [SalesSheetsController::class, 'store']);
Route::get('/salesSheets/{id}', [SalesSheetsController::class, 'show']);
Route::post('/salesSheets/{id}', [SalesSheetsController::class, 'update']);
Route::delete('/salesSheets/{id}', [SalesSheetsController::class, 'destroy']);
});
