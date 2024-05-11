<?php

namespace Database\Seeders;

use App\Models\Notelist;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NoteListsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $notelist = new Notelist();
        $notelist->name = 'Susannes Notizbuch';
        $notelist->visibility = false;
        $user1 = User::where('firstname','Susanne')->first();
        $notelist->creator()->associate($user1);
        $notelist->save();

        $notelist2 = new Notelist();
        $notelist2->name = 'Wolfis Notizbuch';
        $notelist2->visibility = false;
        $user2 = User::where('firstname', 'Wolfgang')->first();
        $notelist2->creator()->associate($user2);
        $notelist2->save();
    }
}
