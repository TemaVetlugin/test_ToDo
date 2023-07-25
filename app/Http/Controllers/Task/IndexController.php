<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Models\Folder;
use App\Models\Task;
use Illuminate\Http\Response;

class IndexController extends Controller
{
    public function __invoke()
    {
        $user = auth()->user();
        $data['tasks'] = Task::where('user_id', $user->id)->orderBy('id', 'DESC')->get();
        $data['folders'] = Folder::all();
        return response($data, Response::HTTP_OK);
    }

}
