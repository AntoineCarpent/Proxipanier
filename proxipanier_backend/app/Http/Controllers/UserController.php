<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;


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
        'address' => 'required|string|max:255',
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
        'password' => bcrypt($request->password),
        'address' => $request->address,
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


public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $user->tokens()->delete();

            $token = $user->createToken("API TOKEN")->plainTextToken;

            return response()->json([
                'status' => true,
                'message' => 'Login successful',
                'user' => $user,
                'token' => $token,
            ], 200);
        }

        return response()->json([
            'status' => false,
            'message' => 'Invalid credentials',
        ], 401);
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
        $user = User::find($id);
    
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found',
            ], 404);
        }
    
        $validator = Validator::make($request->all(), [
            'role' => 'required|integer|in:1,2',
            'name' => 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => ['nullable', 'string', 'min:6'],
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }
    
        $user->update($validator->validated());
    
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
            $user->save();
        }
    
        return response()->json([
            'status' => true,
            'message' => 'User updated successfully',
            'user' => $user,
        ]);
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

        if ($user) {
            $user->saleSheet()->delete();
            $user->tokens()->delete();
            $user->delete();
            return response()->json([
                'status' => true,
                'message' => 'User deleted successfully',
            ], 200);
        }

        return response()->json([
            'status' => false,
            'message' => 'User not found',
        ], 404);
    }
}
