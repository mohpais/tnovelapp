<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Models\UserRole;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       // Attach roles to users
       $admin = User::where('username', 'superadmin')->first();
       $adminRole = Role::where('name', 'Super Admin')->first();

       $admin->roles()->attach($adminRole->id);
    }
}
