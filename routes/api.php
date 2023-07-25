<?php

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
Route::group([
    'namespace'=>'App\Http\Controllers',
    'middleware' => 'api'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

    Route::group(['namespace'=>'User', 'prefix'=>'users'], function(){
        Route::post('/', 'StoreController');
    });


    Route::group(['middleware'=>'jwt.auth'], function(){
        Route::group(['namespace'=>'Folder', 'prefix'=>'folders'], function(){
            Route::post('/', 'StoreController');
        });

        Route::group(['namespace'=>'Task', 'prefix'=>'tasks'], function(){
            Route::post('/', 'StoreController');
            Route::post('/folder', 'FolderController');
            Route::get('/', 'IndexController');
            Route::delete('/{task}', 'DeleteController');
        });
    });

});
