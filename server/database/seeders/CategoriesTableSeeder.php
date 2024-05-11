<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $category1 = new Category();
        $category1->category = 'Fitness';
        $category1->save();

        $category2 = new Category();
        $category2->category = 'Arbeit';
        $category2->save();

        $category3 = new Category();
        $category3->category = 'Freizeit';
        $category3->save();

        $category4 = new Category();
        $category4->category = 'Kinder';
        $category4->save();
    }
}
