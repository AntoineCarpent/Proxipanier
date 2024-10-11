<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{

    use HasFactory, HasApiTokens;

    protected $fillable = [
        'role',
        'name',
        'firstname',
        'email',
        'password',
        'phone_number',
        'address',
        'postal_code',
        'city',
        'latitude',
        'longitude',
    ];


    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'favorites' => 'array',
    ];

    public function salesSheets()
    {
        return $this->hasMany(SalesSheets::class, 'user_id');
    }
    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }
}
