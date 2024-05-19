import { Routes } from '@angular/router';
import {NotelistListComponent} from "./notelist-list/notelist-list.component";
import {NoteListComponent} from "./note-list/note-list.component";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {NotelistFormComponent} from "./notelist-form/notelist-form.component";
import {NoteFormComponent} from "./note-form/note-form.component";
import {LoginComponent} from "./login/login.component";
import {TodoFormComponent} from "./todo-form/todo-form.component";

export const routes: Routes = [
  {path:'',redirectTo:'notelists',pathMatch:'full'},
  {path:'notelists', component: NotelistListComponent},
  {path:'notelists/:id', component: NoteListComponent},
  {path:'todos', component: TodoListComponent},
  {path:'todo-form', component: TodoFormComponent},
  {path:'todo-form/:id', component: TodoFormComponent},
  {path:'notelist-form', component: NotelistFormComponent},
  {path:'notelist-form/:id', component: NotelistFormComponent},
  {path:'note-form', component: NoteFormComponent},
  {path:'note-form/:id', component: NoteFormComponent},
  {path:'login',component: LoginComponent}
];
