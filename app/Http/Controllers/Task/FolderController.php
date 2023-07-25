<?php


namespace App\Http\Controllers\Task;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Task\StoreRequest;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class FolderController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = auth()->user();
        $folder_id = $request->input('folder_id');
        $res['tasks'] = Task::where('user_id', $user->id)->where('folder_id', $folder_id)->orderBy('id', 'DESC')->get();
        return response($res, Response::HTTP_OK);
    }

}
