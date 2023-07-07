<?php

use App\Http\Controllers\StudentController;
use App\Http\Controllers\GuardianController;
use App\Http\Controllers\AuthController;
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
Route::post('login',[UserController::class,'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

//guardian
Route::middleware('auth:sanctum')->post('/guardian/add', [GuardianController::class, 'addGuardian']);
Route::middleware('auth:sanctum')->get('/guardian/getAll', [GuardianController::class, 'getAll']);
Route::middleware('auth:sanctum')->get('/guardian/getGuardianById/{id}', [GuardianController::class, 'getGuardianById']);
Route::middleware('auth:sanctum')->delete('/guardian/delete/{id}', [GuardianController::class, 'removeGuardian']);
Route::middleware('auth:sanctum')->put('/guardian/updateGuardian/{id}', [GuardianController::class, 'updateGuardian']);


//student     (have guardian Id) = 
Route::middleware('auth:sanctum')->post('/student/add', [StudentController::class, 'addStudent']);
Route::middleware('auth:sanctum')->get('/student/getAll', [StudentController::class, 'getAll']);
Route::middleware('auth:sanctum')->get('/student/getStudentById/{id}', [StudentController::class, 'getStudentById']);
Route::middleware('auth:sanctum')->delete('/student/delete/{id}', [StudentController::class, 'removeStudent']);
Route::middleware('auth:sanctum')->put('/student/updateStudent/{id}', [StudentController::class, 'updateStudent']);






Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
