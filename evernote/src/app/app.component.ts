import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NotelistListComponent} from "./notelist-list/notelist-list.component";
import {Notelist} from "./shared/notelist";
import {NoteListComponent} from "./note-list/note-list.component";
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotelistListComponent, NoteListComponent, RouterLink],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'evernote';
  constructor(private authService: AuthenticationService) {}
  //notelistListOn:boolean = true;
  //notelistDetailsOn:boolean = false;

  //notelist:Notelist|undefined;

  //showNoteListDetails(notelist: Notelist) {
  //  this.notelist = notelist;
  //  this.notelistListOn = false;
  //  this.notelistDetailsOn = true;
  //}

  //showNoteListList() {
  //  this.notelistListOn = true;
  //  this.notelistDetailsOn = false;
  //}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getLoginLabel() {
    if (this.isLoggedIn()) {
      return "Logout";
    } else {
      return "Login";
    }
  }
}
