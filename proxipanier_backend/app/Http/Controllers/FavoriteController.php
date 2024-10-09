<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    // Lister les favoris d'un utilisateur
    public function index()
    {
        $user = Auth::user();
        $favorites = Favorite::with('producer')->where('user_id', $user->id)->get();
        return response()->json($favorites);
    }

    // Ajouter un favori
    public function store(Request $request)
    {
        $request->validate([
            'producer_id' => 'required|exists:users,id', // Vérifie que le producteur existe
        ]);

        $favorite = Favorite::create([
            'user_id' => Auth::id(),
            'producer_id' => $request->producer_id,
        ]);

        return response()->json($favorite, 201); // Retourne le favori créé
    }

    // Supprimer un favori
    public function destroy($producer)
    {
        $user = Auth::user();
        $favorite = Favorite::where('user_id', $user->id)->where('producer_id', $producer)->first();

        if ($favorite) {
            $favorite->delete();
            return response()->json(null, 204); // Supprimé avec succès
        }

        return response()->json(['message' => 'Favori non trouvé'], 404);
    }
}
