<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'fullname' => 'Moh Pais',
            'username' => 'superadmin',
            'email' => 'super.admin@tnovelapp.com',
            'password' => Hash::make('TNovelApp@2024')
        ]);
    }
}
