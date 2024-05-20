import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NotelistFactory} from "../shared/notelist-factory";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {NotelistFormErrorMessages} from "./notelist-form-error-messages";
import {Notelist} from "../shared/notelist";
import {NotelistEvernoteService} from "../shared/notelist-evernote.service";
import {ShareToUserComponent} from "../share-to-user/share-to-user.component";
import {User} from "../shared/user";

@Component({
  selector: 'bs-notelist-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    ShareToUserComponent,
    NgIf
  ],
  templateUrl: './notelist-form.component.html',
  styles: ``
})
export class NotelistFormComponent implements OnInit{
  notelistForm: FormGroup;
  notelist = NotelistFactory.empty();
  isUpdatingNotelist = false;
  errors:{[key:string]:string} = {};
  notelistId: number = 0;

  constructor(
    private fb: FormBuilder,
    private service: NotelistEvernoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.notelistForm = this.fb.group({});
  }

  ngOnInit() {
    const Id = this.route.snapshot.params['id'];
    this.notelistId=Id;
    if(Id) {
      this.isUpdatingNotelist = true;
      this.service.getSingleNotelist(Id).subscribe((nl: Notelist) => {
        this.notelist = nl;
        this.initNoteList();
      });
    }
    this.initNoteList();
  }

  initNoteList() {
    this.notelistForm = this.fb.group({
      id: [this.notelist.id],
      name: [this.notelist.name, Validators.required],
      visibility: [this.notelist.visibility, Validators.required],
      creator_id: [this.isUpdatingNotelist ? this.notelist.creator_id : sessionStorage.getItem('userId'), Validators.required],
      notes: this.fb.array([])
    });

    this.notelistForm.statusChanges.subscribe(()=>this.updateErrorMessages());
  }

  submitNotelistForm() {
    const notelist : Notelist = NotelistFactory.fromObject(this.notelistForm.value);
    if(this.isUpdatingNotelist){
      this.service.updateNotelist(notelist).subscribe(() => {
        this.router.navigate([`../../notelists`],{relativeTo:this.route});
      });
    } else{
      this.service.createNotelist(notelist).subscribe(()=>{
        this.notelist = NotelistFactory.empty();
        this.notelistForm.reset(NotelistFactory.empty());
        this.router.navigate(['../notelists'],{relativeTo:this.route});
      });
    }
  }
  private updateErrorMessages() {
    this.errors = {};
    for(const message of NotelistFormErrorMessages){
      const control = this.notelistForm.get(message.forControl)
      if(control && control.dirty && control.invalid &&
        control.errors && control.errors[message.forValidator] &&
        !this.errors[message.forControl]){
        this.errors[message.forControl] = message.text;
      }
    }
  }

  userSelected(user:User) {
    if(confirm('Benutzer'+user.firstname+' '+user.lastname+'eine Anfrage senden')) {
      console.log('Anfrage senden', user);
      this.service.addUserToList(this.notelist, user).subscribe(() => {
        console.log('gesendet')
      });
    }
  }
}


