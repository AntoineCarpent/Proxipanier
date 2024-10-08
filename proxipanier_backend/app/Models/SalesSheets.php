<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesSheets extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_name',
        'date',
        'start',
        'end',
        'price',
        'address',
        'postal_code',
        'city',
        'description'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
