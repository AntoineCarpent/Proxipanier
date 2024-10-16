<?php

namespace App\Http\Controllers;

use App\Models\SalesSheets;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class SalesSheetsController extends Controller
{
    public function index()
    {
        $saleSheet = SalesSheets::all();
        return response()->json($saleSheet, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_name' => 'required|string|max:255',
            'date' => 'required|date_format:Y-m-d',
            'start' => 'required|date_format:H:i',
            'end' => 'required|date_format:H:i',
            'price' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'postal_code' => 'required|required|string|max:10',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = Auth::user();

        $saleSheet = SalesSheets::create([
            'user_id' => $user->id,
            'product_name' => $request->product_name,
            'date' => $request->date,
            'start' => $request->start,
            'end' => $request->end,
            'price' => $request->price,
            'address' => $request->address,
            'postal_code' => $request->postal_code,
            'city' => $request->city,
            'description' => $request->description,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Sales sheet created successfully',
            'data' => $saleSheet,
        ], 201);
    }


    public function show(string $id)
    {
        $saleSheet = SalesSheets::find($id);
        return $saleSheet;
    }

    public function update(Request $request, SalesSheets $salesSheet, string $id)
    {
        $validator = Validator::make($request->all(), [
            'product_name' => 'required|string|max:255',
            'date' => 'required|date_format:Y-m-d',
            'start' => 'required|date_format:H:i',
            'end' => 'required|date_format:H:i',
            'price' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'postal_code' => 'required|required|string|max:10',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $saleSheet = SalesSheets::find($id);
        $saleSheet->update($validator->validated());

        return response()->json([
            'status' => true,
            'message' => 'Sales sheet updated successfully',
            'data' => $saleSheet,
        ], 201);
    }

    public function destroy(String $id)
    {
        $saleSheet = SalesSheets::find($id);

        if ($saleSheet) {
            $saleSheet->delete();
            return response()->json([
                'status' => true,
                'message' => 'saleSheet deleted successfully',
            ], 201);
        }

        return response()->json([
            'status' => false,
            'message' => 'saleSheet not found',
        ], 404);
    }
    public function getUsersWithSales()
    {
        return User::with('salesSheets')->where('role_id', 2)->get();
    }
}
