<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SalesSheets;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        SalesSheets::factory(1)->create();
    }
}
