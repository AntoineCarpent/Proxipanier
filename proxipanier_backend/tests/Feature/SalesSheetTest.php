<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\SalesSheets;
use Illuminate\Support\Facades\Auth;
use PHPUnit\Framework\Attributes\test;
use App\Http\Controllers\SalesSheetsController;




class SalesSheetTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->actingAs($this->user);
    }
    /** @test */
    public function it_creates_a_sales_sheet_successfully()
    {
        $this->user = User::factory()->create();

        $this->actingAs($this->user);

        $response = $this->postJson('/api/salesSheets', [
            'product_name' => 'Test Product',
            'price' => 10,
            'address' => '123 Sample St',
            'postal_code' => '12345',
            'city' => 'Sample City',
            'description' => 'This is a test description.',
            'date' => '2024-10-15',
            'start' => '09:00',
            'end' => '17:00',
            'price' => '10.00',
        ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('sales_sheets', [
            'product_name' => 'Test Product',
            'user_id' => $this->user->id,
        ]);
    }


    /** @test */
    public function it_fails_validation_when_fields_are_missing()
    {
        $response = $this->postJson('/api/salesSheets', []);

        $response->assertStatus(422)
            ->assertJson([
                'status' => false,
                'message' => 'Validation error',
            ])
            ->assertJsonStructure(['errors' => [
                'product_name',
                'price',
                'address',
                'postal_code',
            ]]);
    }

    /** @test */
    public function it_fails_validation_with_invalid_data()
    {
        $this->actingAs($this->user);

        $response = $this->postJson('/api/salesSheets', [
            'product_name' => '',
            'date' => 'invalid-date',
            'start' => 'invalid-time',
            'end' => 'invalid-time',
            'price' => '',
            'address' => '',
            'postal_code' => '',
            'city' => '',
            'description' => '',
            'date' => '',
            'start' => '',
            'end' => '',
            'price' => '',
        ]);

        $response->assertStatus(422)
            ->assertJson([
                'status' => false,
                'message' => 'Validation error',
            ]);
    }
}
