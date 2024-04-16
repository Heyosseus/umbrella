<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\Category::factory(6)->create();

        \App\Models\Product::factory(1000)->create()->each(function ($product) {
            $categories = \App\Models\Category::inRandomOrder()->limit(rand(1, 3))->get();
            $product->categories()->attach($categories);
        });
    }
}
