<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return $users;
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'role' => 'required|integer|in:1,2',
            'name' => 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => ['required', 'string', 'min:6'],
            'adresse' => 'required|string|max:255',
            'city' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 401);
        }

        $user = User::create([
            'name' => $request->name,
            'firstname' => $request->firstname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'adresse' => $request->adresse,
            'city' => $request->city,
            'role' => $request->role,
        ]);

        $token = $user->createToken("API TOKEN")->plainTextToken;
        
        return response()->json([
            'status' => true,
            'message' => 'User Created Successfully',
            'token' => $token,
        ], 200);
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 401);
        }
        if (Auth::attempt($request->all())) {
            if(auth('sanctum')->check()){
            auth()->user()->tokens()->delete();
            }
        }

        $user = Auth::user();
        $token = $user->createToken("API TOKEN")->plainTextToken;
        return response()->json([
            'status'=>true,
            'message' => 'Login successful',
            'user' => $user,
            "token" => $token,
        ]);

    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);
        return $user;
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|max:255',
            'email' => 'required',
            'role' => 'required',
        ]);
        $user = User::find($id);
        $user->update($request->all());
        return $user;
    }

    public function isAdmin()
    {
        $user = Auth::user();
        
        if ($user->role === 'user') {
            return response()->json([
                'response'=>false,
            ]);
        } else if ($user->role === "administrator") {
            return response()->json([
                'response'=>true,
            ]);
        }
    }

    public function logout(Request $request)
    {
        $user = Auth::user();

        if ($user) {
            $user->tokens()->delete();

            return response()->json([
                'status' => true,
                'message' => 'Logout successful',
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'User not authenticated',
        ], 401);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        $user->delete();
        return 'User deleted successfully';
    }
}