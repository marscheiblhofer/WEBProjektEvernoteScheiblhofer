import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NotelistFactory} from "../shared/notelist-factory";
import {NotelistEvernoteService} from "../shared/notelist-evernote.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Notelist} from "../shared/notelist";

@Component({
  selector: 'app-notelist-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './notelist-form.component.html',
  styles: ``
})
export class NotelistFormComponent implements OnInit {
  notelistForm: FormGroup;
  notelist = NotelistFactory.empty();
  isUpdatingNotelist = false;

  constructor(
    private fb: FormBuilder,
    private service: NotelistEvernoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.notelistForm = this.fb.group({});
  }

  ngOnInit() {
    const nlId = this.route.snapshot.params['id'];
    if(nlId) {
      this.isUpdatingNotelist = true;
      this.service.getSingleNotelist(nlId).subscribe(nl => {
        this.notelist = nl;
      });
      console.log(this.notelist)
      this.initNoteList();
    }
  }

  initNoteList() {
    console.log('notelist-form', this.notelist)
    this.notelistForm = this.fb.group({
      name: this.notelist.name
    });
  }

}
