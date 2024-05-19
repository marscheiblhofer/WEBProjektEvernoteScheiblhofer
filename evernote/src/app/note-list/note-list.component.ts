import {Component, OnInit} from '@angular/core';
import {Note} from "../shared/note";
import {Notelist} from "../shared/notelist";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NotelistFactory} from "../shared/notelist-factory";
import {ToastrService} from "ngx-toastr";
import {NotelistEvernoteService} from "../shared/notelist-evernote.service";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TodoFactory} from "../shared/todo-factory";
import {Todo} from "../shared/todo";

@Component({
  selector: 'bs-note-list',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './note-list.component.html',
  styles: ``
})
export class NoteListComponent implements OnInit {
  notelist: Notelist = NotelistFactory.empty();
  noteDetailsOn: boolean = false;
  note: Note | undefined;
  todoForm: FormGroup;
  todo = TodoFactory.empty();
  errors: { [key: string]: string } = {};


  constructor(private evernoteService: NotelistEvernoteService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private service: NotelistEvernoteService,) {
    this.todoForm = this.fb.group({})
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.evernoteService.getSingleNotelist((params['id']).toString())
      .subscribe((notelist: Notelist) => {
        this.notelist = notelist;
        this.initTodo();
      });
    this.initTodo();
  }

  showNoteDetails(note: Note) {
    this.noteDetailsOn = true;
    this.evernoteService.getSingleNote((note.id).toString())
      .subscribe((note: Note) => this.note = note);
  }

  removeNotelist() {
    if (confirm("Notizbuch wirklich löschen?")) {
      this.evernoteService.removeNotelist(this.notelist.id).subscribe(
        () => {
          this.router.navigate(['/..'], {relativeTo: this.route});
          this.toastr.success('Notizbuch gelöscht!', "Evernote");
        }
      );
    }
  }

  removeNote() {
    if (this.note) {
      if (confirm("Notiz wirklich löschen?")) {
        this.evernoteService.removeNote(this.note?.id).subscribe(
          () => {
            this.ngOnInit();
            this.note = undefined;
            this.toastr.success('Notiz gelöscht!', "Evernote");
          }
        );
      }
    }
  }

  initTodo() {
    this.todoForm = this.fb.group({
      id: [this.todo.id],
      title: [this.todo.title],
      visibility: [0],
      completed: [false],
      description: [this.todo.description],
      due_date: [this.todo.due_date],
      notelist_id: [this.notelist.id],
      note_id: [this.note?.id],
      responsible_person_id: [this.todo.responsible_person?.id],
      creator_id: [sessionStorage.getItem('userId')]
    });
  }

  submitTodoForm() {
    const todo: Todo = TodoFactory.fromObject(this.todoForm.value);
    todo.creator_id = Number(sessionStorage.getItem('userId'));
    todo.notelist_id = Number(todo.notelist);
    todo.note_id = Number(this.note?.id);
    //todo.responsible_person_id = Number(todo.responsible_person);
    this.service.createTodo(todo).subscribe(() => {
      this.todo = TodoFactory.empty();
      this.todoForm.reset(TodoFactory.empty());
    });
  }
}
