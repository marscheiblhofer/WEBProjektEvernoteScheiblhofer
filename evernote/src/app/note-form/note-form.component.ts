import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NotelistFactory} from "../shared/notelist-factory";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NoteFactory} from "../shared/note-factory";
import {Note} from "../shared/note";
import {NotelistFormErrorMessages} from "../notelist-form/notelist-form-error-messages";
import {NoteFormErrorMessages} from "./note-form-error-messages";
import {CategoryFactory} from "../shared/category-factory";
import {NotelistEvernoteService} from "../shared/notelist-evernote.service";

@Component({
  selector: 'bs-note-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './note-form.component.html',
  styles: ``
})
export class NoteFormComponent implements OnInit{
  noteForm : FormGroup;
  note= NoteFactory.empty();
  isUpdatingNote = false;
  errors:{[key:string]:string} = {};
  noteId: number|undefined;
  notelist_id: number|undefined;
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private everservice: NotelistEvernoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.noteForm = this.fb.group({});
    this.categoryForm = this.fb.group({});
    const navigation = router.getCurrentNavigation();
    console.log(navigation?.extras.state);
    if(navigation && navigation.extras.state){
      this.notelist_id = navigation?.extras.state['notelist'];
    }
  }

  ngOnInit() {
    const Id = this.route.snapshot.params['id'];
    console.log(this.route.snapshot.params);
    if(Id){
      this.noteId=Id;
    }
    if(Id){ // wir fügen eine Notiz hinzu
      this.isUpdatingNote = true;
      this.everservice.getSingleNote(Id).subscribe(note =>{
        this.note = note;
        this.initNote();
      });
    }
    this.initNote();
  }

  initNote(){
    this.noteForm = this.fb.group({
      id: [this.note.id],
      title: [this.note.title, Validators.required],
      description: [this.note.description],
      notelist_id: [this.note.notelist_id, Validators.required],
      categories: this.fb.array([])
    });

    this.noteForm.statusChanges.subscribe(()=>this.updateErrorMessages());

  }

  submitNoteForm(){
    const note : Note = NoteFactory.fromObject(this.noteForm.value);
    console.log(note);
    if(this.isUpdatingNote){
      this.everservice.updateNote(note).subscribe(()=> {
        this.router.navigate([`../../notelists/${note.notelist_id}`],{relativeTo:this.route});
      });
    }else{
      if(this.notelist_id){
        note.notelist_id = this.notelist_id;
      }
      console.log(note);
      this.everservice.createNote(note).subscribe(()=>{
        this.note = NoteFactory.empty();
        this.noteForm.reset(NoteFactory.empty());
        this.router.navigate([`../notelists/${note.notelist_id}`],{relativeTo:this.route});
      });
    }
  }

  private updateErrorMessages() {
    this.errors = {};
    for(const message of NoteFormErrorMessages){
      const control = this.noteForm.get(message.forControl)
      if(control && control.dirty && control.invalid &&
        control.errors && control.errors[message.forValidator] &&
        !this.errors[message.forControl]){
        this.errors[message.forControl] = message.text;
      }
    }
  }

  createCategory(category?:any){
    return this.fb.group({
      category:[category, Validators.required]
      }
    )
  }

  addCategory() {

  }

  /*submitCategoryForm() {
    this.everservice.createCategory(category).subscribe(()=>{
      this.category = CategoryFactory.empty();
      this.categoryForm.reset(CategoryFactory.empty());
      this.router.navigate([`../notelists/${note.notelist_id}`],{relativeTo:this.route});
    });
  }*/
}

