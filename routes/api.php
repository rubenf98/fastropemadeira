<?php

use App\Http\Controllers\ExternalReservationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('login', 'App\Http\Controllers\AuthController@login');
Route::post('logout', 'AuthController@logout');
Route::post('refresh', 'AuthController@refresh');
Route::post('me', 'AuthController@me');

Route::post('/external-reservation', ExternalReservationController::class);

Route::get('reservation/disabledDate', 'App\Http\Controllers\ReservationController@disabledDates');
Route::get('reservation/showFromToken', 'App\Http\Controllers\ReservationController@showFromToken');

Route::apiResource('contact', 'App\Http\Controllers\ContactController');
Route::apiResource('feedback', 'App\Http\Controllers\FeedbackController');
Route::apiResource('reservation', 'App\Http\Controllers\ReservationController');
Route::apiResource('activity', 'App\Http\Controllers\ActivityController');
Route::apiResource('experience', 'App\Http\Controllers\ExperienceController');
