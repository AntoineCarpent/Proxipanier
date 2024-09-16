<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesSheet extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'description',
        'time',
        'adresse',
        'city',
    ];

    protected $casts = [
        'time' => 'datetime',
        'price' => 'decimal:2',
    ];
}
