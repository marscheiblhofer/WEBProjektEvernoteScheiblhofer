import { Component } from '@angular/core';
import {Notelist} from "../shared/notelist";
import {NotelistEvernoteService} from "../shared/notelist-evernote.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Todo} from "../shared/todo";
import {NgIf} from "@angular/common";
import {TodoFactory} from "../shared/todo-factory";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './todo-list.component.html',
  styles: ``
})
export class TodoListComponent {
  todos: Todo[] = [];
  constructor(private service: NotelistEvernoteService,
              private toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.service.getAllTodos().subscribe(res => this.todos = res);
  }

  todoMarkAsChecked(todo: Todo) {
    todo.completed = true;
    this.service.updateTodo(todo).subscribe(() => {
      this.ngOnInit();
    });
  }

  todoDelete(id: number) {
    if(confirm("Todo wirklich löschen?")) {
      this.service.deleteTodo(id).subscribe(() => {
        this.ngOnInit();
        this.toastr.success("Todo wurde gelöscht!")
      });
    }
  }
}
