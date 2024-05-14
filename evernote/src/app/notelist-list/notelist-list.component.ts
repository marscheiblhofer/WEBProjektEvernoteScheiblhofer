import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Notelist} from "../shared/notelist";
import {NoteListComponent} from "../note-list/note-list.component";
import {NgClass} from "@angular/common";
import {NotelistEvernoteService} from "../shared/notelist-evernote.service";

@Component({
  selector: 'app-notelist-list',
  standalone: true,
  imports: [
    NoteListComponent,
    NgClass
  ],
  templateUrl: './notelist-list.component.html',
  styles: ``
})
export class NotelistListComponent implements OnInit {
  notelists: Notelist[] = [];
  constructor(private service: NotelistEvernoteService) {
  }
  ngOnInit(): void {
    this.service.getAllNotelists().subscribe(res => this.notelists = res);

  }

  @Output() showDetailsEvent = new EventEmitter<Notelist>();

  showNotelistDetails(notelist: Notelist) {
    this.showDetailsEvent.emit(notelist);
  }
}
