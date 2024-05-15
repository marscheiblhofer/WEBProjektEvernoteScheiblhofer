<?php

namespace Database\Seeders;

use App\Models\Note;
use App\Models\Notelist;
use App\Models\Todo;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TodosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $todo1 = new Todo();
        $todo1->title = 'Trainieren gehen';
        $todo1->description = 'Im Lionfit Hgb';
        $todo1->due_date = new \DateTime('2024-05-21');
        $todo1->visibility = false;
        $todo1->completed = false;
        $notelist1 = Notelist::all()->first();
        $todo1->notelist()->associate($notelist1);
        $note1 = Note::all()->first();
        $todo1->note()->associate($note1);
        $user1 = User::all()->first();
        $todo1->responsible_person()->associate($user1);
        $user1_2 = User::all()->first();
        $todo1->creator()->associate($user1_2);
        $todo1->save();

        $todo2 = new Todo();
        $todo2->title = 'Hausübung machen';
        $todo2->description = 'WEB Projekt machen bis Freitag';
        $todo2->due_date = new \DateTime('2024-05-21');
        $todo2->visibility = false;
        $todo2->completed = false;
        $user2_2 = User::findOrFail(1);
        $todo2->creator()->associate($user2_2);
        $todo2->save();

        $todo3 = new Todo();
        $todo3->title = 'Pflanzen spritzen';
        $todo3->due_date = new \DateTime('2024-05-25');
        $todo3->visibility = false;
        $todo3->completed = true;
        $user3_2 = User::findOrFail(3);
        $todo3->creator()->associate($user3_2);
        $todo3->save();
    }
}
