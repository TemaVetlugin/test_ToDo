<?php


namespace App\Http\Controllers\Folder;

use App\Models\Folder;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Folder\StoreRequest;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class StoreController extends Controller
{
    public function __invoke(StoreRequest $request)
    {
        $data=$request->validated();
        Folder::create($data);
        $res['folders'] = Folder::all();
        return response($res, Response::HTTP_OK);
    }

}
