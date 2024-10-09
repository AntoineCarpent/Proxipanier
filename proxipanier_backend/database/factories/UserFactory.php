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
        $names = [
            'Carpentier',
            'Dubois',
            'Durand',
            'Moreau',
            'Simon',
            'Laurent',
            'Garcia',
            'Bernard',
            'Petit',
            'Robert'
        ];

        $firstnames = [
            'Antoine',
            'Marie',
            'Lucas',
            'Sophie',
            'Julien',
            'Emma',
            'Léo',
            'Camille',
            'Nathan',
            'Clara'
        ];

        $postalCodes = [
            '63000' => ['city' => 'Clermont-Ferrand', 'lat' => 45.777222, 'lng' => 3.087025],
            '75001' => ['city' => 'Paris', 'lat' => 48.856613, 'lng' => 2.352222],
            '33000' => ['city' => 'Bordeaux', 'lat' => 44.837789, 'lng' => -0.57918],
            '69001' => ['city' => 'Lyon', 'lat' => 45.764043, 'lng' => 4.835659],
            '34000' => ['city' => 'Montpellier', 'lat' => 43.6119, 'lng' => 3.8772],
            '13001' => ['city' => 'Marseille', 'lat' => 43.296482, 'lng' => 5.36978],
            '59000' => ['city' => 'Lille', 'lat' => 50.62925, 'lng' => 3.057256],
            '67000' => ['city' => 'Strasbourg', 'lat' => 48.573405, 'lng' => 7.752111],
            '21000' => ['city' => 'Dijon', 'lat' => 47.322047, 'lng' => 5.04148],
            '37000' => ['city' => 'Tours', 'lat' => 47.394144, 'lng' => 0.68484]
        ];

        $roles = [1, 2];

        $postalCode = $this->faker->randomElement(array_keys($postalCodes));
        $locationData = $postalCodes[$postalCode];

        return [
            'role' => $this->faker->randomElement($roles),
            'name' => $this->faker->randomElement($names),
            'firstname' => $this->faker->randomElement($firstnames),
            'email' => $this->faker->unique()->safeEmail,
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('azerty63'),
            'remember_token' => Str::random(10),
            'phone_number' => $this->faker->phoneNumber,
            'address' => $this->faker->address,
            'postal_code' => $postalCode,
            'city' => $locationData['city'],
            'latitude' => $locationData['lat'],
            'longitude' => $locationData['lng'],
        ];
    }

    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
