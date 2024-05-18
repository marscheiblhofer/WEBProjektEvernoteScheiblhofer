<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = new User();
        $user->firstname = 'Susanne';
        $user->lastname = 'Herberginger';
        $user->email = 'susi@gmx.at';
        $user->password = bcrypt('abcdef123');
        $user->picture = 'https://picsum.photos/400/400';
        $user->save();

        $user2 = new User();
        $user2->firstname = 'Wolfgang';
        $user2->lastname = 'Dauninger';
        $user2->email = 'wolfidauninger@gmx.at';
        $user2->password = 'ffhh22X_#';
        $user2->picture = 'https://picsum.photos/400/400';
        $user2->save();

        $user2 = new User();
        $user2->firstname = 'Severin';
        $user2->lastname = 'Krumm';
        $user2->email = 'skrumm@gmx.at';
        $user2->password = 'sdhjgkös#456';
        $user2->picture = 'https://picsum.photos/400/400';
        $user2->save();
    }
}
