import {Component, OnInit} from '@angular/core';
import {Notelist} from "../shared/notelist";
import {NoteListComponent} from "../note-list/note-list.component";
import {RouterLink} from "@angular/router";
import {NotelistEvernoteService} from "../shared/notelist-evernote.service";

@Component({
  selector: 'bs-notelist-list',
  standalone: true,
  imports: [
    NoteListComponent,
    RouterLink
  ],
  templateUrl: './notelist-list.component.html',
  styles: ``
})
export class NotelistListComponent implements OnInit{
  notelists: Notelist[] = [];

  constructor(private service: NotelistEvernoteService) {
  }
  ngOnInit(): void {
    this.service.getAllNotelists().subscribe(res => this.notelists = res);
  }

}
