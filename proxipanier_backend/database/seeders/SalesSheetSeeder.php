<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SalesSheet;

class SalesSheetSeeder extends Seeder
{
    public function run(): void
    {
        SalesSheet::factory(10)->create();
    }
}
