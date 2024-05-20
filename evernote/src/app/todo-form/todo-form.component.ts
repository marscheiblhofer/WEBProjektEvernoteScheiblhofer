import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Todo} from "../shared/todo";
import {TodoFactory} from "../shared/todo-factory";
import {NotelistEvernoteService} from "../shared/notelist-evernote.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-todo-form',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './todo-form.component.html',
  styles: ``
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;
  todo = TodoFactory.empty();
  errors:{[key:string]:string} = {};
  notelist = undefined;
  note = undefined;

  constructor(private service: NotelistEvernoteService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.todoForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.notelist = params['notelistId'];
      this.note = params['noteId'];
    });
    this.initTodo();
  }

  initTodo() {
    this.todoForm = this.fb.group({
      id: [this.todo.id],
      title: [this.todo.title],
      visibility: [this.todo.visibility],
      completed: [false],
      description: [this.todo.description],
      due_date: [this.todo.due_date],
      notelist_id: [this.todo.notelist_id],
      note_id: [this.todo.note_id],
      //responsible_person_id: [this.todo.responsible_person?.id],
      creator_id: [sessionStorage.getItem('userId')]
    });
  }
  submitTodoForm() {
    const todo: Todo = TodoFactory.fromObject(this.todoForm.value);
    todo.creator_id = Number(sessionStorage.getItem('userId'));
    if(this.notelist) todo.notelist_id = Number(this.notelist);
    if(this.note) todo.note_id = Number(this.note);
    //todo.responsible_person_id = Number(todo.responsible_person);
    this.service.createTodo(todo).subscribe(() => {
      this.todo = TodoFactory.empty();
      this.todoForm.reset(TodoFactory.empty());
      if(this.notelist && this.note) {
        this.router.navigate(['../notelists/'+this.notelist],{relativeTo:this.route});
      } else {
        this.router.navigate(['../todos'],{relativeTo:this.route});
      }
    });
  }
}
