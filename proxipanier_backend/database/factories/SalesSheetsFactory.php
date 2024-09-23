<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SalesSheets>
 */
class SalesSheetsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'product_name' => fake()->unique()->word(),
            'date' => fake()->date(),
            'start' => fake()->time(),
            'end' => fake()->time(),
            'address' => fake()->streetAddress(),
            'city' => fake()->city(),
            'description' => fake()->sentence(),
        ];
    }
}