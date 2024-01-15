<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roleData = [
            [
                'name' => 'super-admin',
                'created_by' => 'System',
                'updated_by' => 'System'
            ],
            [
                'name' => 'admin-content',
                'created_by' => 'System',
                'updated_by' => 'System'
            ],
            [
                'name' => 'admin-user',
                'created_by' => 'System',
                'updated_by' => 'System'
            ],
            [
                'name' => 'premium-user',
                'created_by' => 'System',
                'updated_by' => 'System'
            ],
            [
                'name' => 'ordinary-user',
                'created_by' => 'System',
                'updated_by' => 'System'
            ]
        ];

        foreach ($roleData as $role) {
            Role::create($role);
        }
    }
}
