<?php

namespace Database\Seeders;

use App\Models\Directions\DivisionModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DivisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $date = date('Y-m-d H:i:s');
        $data= [
            [
                'title' => 'Tier 1',
                'created_at' => $date,
                'updated_at' => $date,
            ],
            [
                'title' => 'Tier 2',
                'created_at' => $date,
                'updated_at' => $date,
            ],
            [
                'title' => 'Tier 3',
                'created_at' => $date,
                'updated_at' => $date,
            ],
            [
                'title' => 'N/A',
                'created_at' => $date,
                'updated_at' => $date,
            ],
        ];

        foreach ($data as $item) {
            DivisionModel::insert($item);
        }
    }
}
