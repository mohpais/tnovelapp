<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Services\DataTableService;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function __construct(private DataTableService $dataTableService)
    {
        $this->middleware('auth:api', ['except' => ['list']]);
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get the ID of the currently authenticated user
        $currentUser = Auth::user();
        
        // Build the query excluding the current user
        $users = User::where('id', '!=', $currentUser->id)
                    ->where('status', 1)
                    ->select('id', 'fullname', 'username', 'email', 'phone', 'gender', 'birthday', 'address', 'photo_profile as photo', 'created_at as registered_at')
                    ->get();
        foreach ($users as $user) {
            $user->age = isset($user->birthday) ? calculateAge($user->birthday) : null;
        }

        return response()->json($users, 200);
    }
    
    /**
     * Display a listing of the resource.
     */
    public function list(Request $request)
    {
        $query = User::query();

        // Use the DataTableService or any other logic as needed
        $response = $this->dataTableService->getJsonResponse($query, $request);

        return response()->json($response, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
