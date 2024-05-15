import { Component } from '@angular/core';
import {Notelist} from "../shared/notelist";
import {NotelistEvernoteService} from "../shared/notelist-evernote.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Todo} from "../shared/todo";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './todo-list.component.html',
  styles: ``
})
export class TodoListComponent {
  todos: Todo[] = [];
  constructor(private service: NotelistEvernoteService) {
  }
  ngOnInit(): void {
    this.service.getAllTodos().subscribe(res => this.todos = res);
    console.log('todos', this.todos);

  }
}
