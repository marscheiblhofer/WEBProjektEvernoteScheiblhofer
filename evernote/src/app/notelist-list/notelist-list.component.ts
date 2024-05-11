import { Component } from '@angular/core';
import {Notelist} from "../shared/notelist";

@Component({
  selector: 'app-notelist-list',
  standalone: true,
  imports: [],
  templateUrl: './notelist-list.component.html',
  styles: ``
})
export class NotelistListComponent {
  notelists: Notelist[] = [];
}
