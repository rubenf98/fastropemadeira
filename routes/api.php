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
Route::post('logout', 'App\Http\Controllers\AuthController@logout');
Route::post('refresh', 'App\Http\Controllers\AuthController@refresh');
Route::post('me', 'App\Http\Controllers\AuthController@me');

Route::post('/external-reservation', ExternalReservationController::class);

Route::get('reservation/disabledDate', 'App\Http\Controllers\ReservationController@disabledDates');
Route::get('reservation/showFromToken', 'App\Http\Controllers\ReservationController@showFromToken');
Route::get('reservation/selector/blockDate', 'App\Http\Controllers\BlockReservationDateController@selector');



Route::apiResource('reservation/blockDate', 'App\Http\Controllers\BlockReservationDateController');
Route::apiResource('contact', 'App\Http\Controllers\ContactController');
Route::apiResource('reviews', 'App\Http\Controllers\ReviewController');
Route::apiResource('feedback', 'App\Http\Controllers\FeedbackController');
Route::apiResource('reservation', 'App\Http\Controllers\ReservationController');
Route::apiResource('activity', 'App\Http\Controllers\ActivityController');
Route::apiResource('experience', 'App\Http\Controllers\ExperienceController');
