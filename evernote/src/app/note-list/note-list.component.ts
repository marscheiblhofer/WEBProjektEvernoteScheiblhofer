import {Component, OnInit} from '@angular/core';
import {Note} from "../shared/note";
import {Notelist} from "../shared/notelist";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NotelistFactory} from "../shared/notelist-factory";
import {ToastrService} from "ngx-toastr";
import {NotelistEvernoteService} from "../shared/notelist-evernote.service";

@Component({
  selector: 'bs-note-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './note-list.component.html',
  styles: ``
})
export class NoteListComponent implements OnInit {
  notelist:Notelist = NotelistFactory.empty();

  constructor(private evernoteService:NotelistEvernoteService,
              private route:ActivatedRoute,
              private router:Router,
              private toastr:ToastrService) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.evernoteService.getSingleNotelist((params['id']).toString())
      .subscribe((notelist:Notelist)=>this.notelist = notelist);
  }

  noteDetailsOn:boolean= false;
  note:Note|undefined;

  showNoteDetails(note: Note) {
    this.noteDetailsOn = true;
    this.evernoteService.getSingleNote((note.id).toString())
      .subscribe((note:Note)=>this.note = note);
  }

  removeNotelist() {
    if(confirm("Notizbuch wirklich löschen?")){
      this.evernoteService.removeNotelist(this.notelist.id).subscribe(
        ()=> {this.router.navigate(['/..'], {relativeTo: this.route});
          this.toastr.success('Notizbuch gelöscht!', "Evernote");
        }
      );
    }
  }

  removeNote(){
    if(this.note) {
      if(confirm("Notiz wirklich löschen?")) {
        this.evernoteService.removeNote(this.note?.id).subscribe(
          () => {
            this.ngOnInit(); this.note = undefined;
            this.toastr.success('Notiz gelöscht!', "Evernote");
          }
        );
      }
    }
  }
}
