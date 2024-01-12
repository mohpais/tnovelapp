<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'fullname' => 'Moh Pais',
            'username' => 'superadmin',
            'email' => 'super.admin@tnovelapp.com',
            'password' => Hash::make('TNovelApp@2024')
        ]);
    }
}
