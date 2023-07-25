<?php

namespace App\Http\Controllers\Task;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class DeleteController extends Controller
{
    public function __invoke( Task $task)
    {
        $user = auth()->user();
        $task->delete();
        $res['tasks'] = Task::where('user_id', $user->id)->orderBy('id', 'DESC')->get();
        return response($res, Response::HTTP_OK);
    }
}
