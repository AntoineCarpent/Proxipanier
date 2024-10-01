<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected static ?string $password = null;

    public function definition(): array
{
    return [
        'role' => 1,
        'name' => "Nom",
        'firstname' => "Prénom",
        'email' => "email@example.com",
        'email_verified_at' => now(),
        'password' => static::$password ??= Hash::make('azerty63'),
        'remember_token' => Str::random(10),
        'phone_number' => '',
        'address' => '',
        'postal_code' => 63000,
        'city' => "Clermont Ferrand",
    ];
}


    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}