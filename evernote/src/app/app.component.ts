import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NotelistListComponent} from "./notelist-list/notelist-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotelistListComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'evernote';
}
