import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Notelist} from "../shared/notelist";
import {Note} from "../shared/note";
import {NotelistEvernoteService} from "../shared/notelist-evernote.service";
import {NotelistListComponent} from "../notelist-list/notelist-list.component";

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [
    NotelistListComponent
  ],
  templateUrl: './note-list.component.html',
  styles: ``
})
export class NoteListComponent implements OnInit{
  @Input('notelist') notelist: Notelist | undefined;
  @Output() showNoteListListEvent = new EventEmitter<any>();
  //notelist:Notelist = BookFactory.empty(); TODO
  //notelist:Notelist | undefined;
  //notes:Note[] | undefined;
  constructor(private service:NotelistEvernoteService) {
  }
  ngOnInit(){
    //const params = this.route.snapshot.params;
    /*if(this.notelistFromList)
      this.service.getSingleNotelist((this.notelistFromList.id).toString())
        .subscribe((nl:Notelist)=>this.notelist = nl);*/
    //console.log('notelistfromlist',this.notelistFromList);
    //console.log('notelistfromlist',this.notelistFromList?.notes);
    console.log(this.notelist);
  }

  showNoteListList() {
    this.showNoteListListEvent.emit();
  }

  noteDetailsOn:boolean = false;
  note:Note|undefined;

  showNoteDetails(note: Note) {
    this.noteDetailsOn = true;
    this.service.getSingleNote((note.id).toString())
      .subscribe((n:Note)=>this.note = n);
  }
}
