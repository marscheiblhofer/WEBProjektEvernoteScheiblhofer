import {Component, OnInit} from '@angular/core';
import {Notelist} from "../shared/notelist";
import {Note} from "../shared/note";
import {NotelistEvernoteService} from "../shared/notelist-evernote.service";
import {NotelistListComponent} from "../notelist-list/notelist-list.component";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NotelistFactory} from "../shared/notelist-factory";
import {ToastrService} from "ngx-toastr";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './note-list.component.html',
  styles: ``
})
export class NoteListComponent implements OnInit{
  notelist: Notelist = NotelistFactory.empty();
  //@Input notelist: Notelist | undefined;
  //@Output() showNoteListListEvent = new EventEmitter<any>();
  //notelist:Notelist = BookFactory.empty(); TODO
  //notelist:Notelist | undefined;
  //notes:Note[] | undefined;
  constructor(private service:NotelistEvernoteService,
              private route:ActivatedRoute,
              private router:Router,
              private toastr: ToastrService) {
  }
  ngOnInit(){
    const params = this.route.snapshot.params;
    //this.notelist = this.service.getSingleNotelist(params['id'])
      this.service.getSingleNotelist((params['id']).toString())
        .subscribe((nl:Notelist)=>this.notelist = nl);
    this.note = undefined;
  }

  //showNoteListList() {
    //this.showNoteListListEvent.emit();
  //}

  noteDetailsOn:boolean = false;
  note:Note|undefined;

  showNoteDetails(note: Note) {
    this.noteDetailsOn = true;
    this.service.getSingleNote((note.id).toString())
      .subscribe((n:Note)=>this.note = n);
    console.log(this.note);
  }

  removeNotelist() {
    if(confirm("Notizbuch wirklich löschen?")) {
      this.service.removeNotelist(this.notelist.id).subscribe(
        () => {
          this.router.navigate(['../'], {relativeTo: this.route});
          this.toastr.success('Notizbuch gelöscht','Evernote');
        }
      )
    }
  }

  removeNote() {
    if(this.note)
    if(confirm("Notizbuch wirklich löschen?")) {
      this.service.removeNote(this.note?.id).subscribe(
        () => {
          this.ngOnInit();
          this.toastr.success('Notiz gelöscht','Evernote');
        }
      )
    }
  }
}
