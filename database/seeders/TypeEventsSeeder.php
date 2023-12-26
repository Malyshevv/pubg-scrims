<?php

namespace Database\Seeders;

use App\Models\Directions\TypeEventsModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TypeEventsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $date = date('Y-m-d H:i:s');
        $data= [
            [
                'title' => 'Tournament',
                'created_at' => $date,
                'updated_at' => $date,
            ],
            [
                'title' => 'Scrim',
                'created_at' => $date,
                'updated_at' => $date,
            ],
        ];

        foreach ($data as $item) {
            TypeEventsModel::insert($item);
        }
    }
}
