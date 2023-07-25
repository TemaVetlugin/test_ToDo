<?php


namespace App\Http\Controllers\Task;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Task\StoreRequest;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class StoreController extends Controller
{
    public function __invoke(StoreRequest $request)
    {
        $user = auth()->user();
        $data=$request->validated();
        $data['user_id']=auth()->user()->id;
        Task::create($data);
        $res['tasks'] = Task::where('user_id', $user->id)->orderBy('id', 'DESC')->get();
        return response($res, Response::HTTP_OK);
    }

}
