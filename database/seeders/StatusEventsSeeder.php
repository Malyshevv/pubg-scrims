<?php

namespace Database\Seeders;

use App\Models\Directions\StatusEventsModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatusEventsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $date = date('Y-m-d H:i:s');
        $data= [
            [
                'title' => 'Close sign-up',
                'created_at' => $date,
                'updated_at' => $date,
            ],
            [
                'title' => 'Start',
                'created_at' => $date,
                'updated_at' => $date,
            ],
            [
                'title' => 'End',
                'created_at' => $date,
                'updated_at' => $date,
            ],
            [
                'title' => 'Open sign-up',
                'created_at' => $date,
                'updated_at' => $date,
            ],
            [
                'title' => 'Coming...',
                'created_at' => $date,
                'updated_at' => $date,
            ],
        ];

        foreach ($data as $item) {
            StatusEventsModel::insert($item);
        }
    }
}
