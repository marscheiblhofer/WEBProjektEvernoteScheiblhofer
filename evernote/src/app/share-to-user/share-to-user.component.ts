import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, switchAll, switchMap, tap} from "rxjs";
import {User} from "../shared/user";
import {NotelistEvernoteService} from "../shared/notelist-evernote.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-share-to-user',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './share-to-user.component.html',
  styles: ``
})
export class ShareToUserComponent implements OnInit{
  keyup = new EventEmitter<string>();
  foundUser: User[] = [];
  isLoading = false;
  @Output() userSelected = new EventEmitter<User>();

  constructor(private service:NotelistEvernoteService) {
  }

  ngOnInit() {
    this.keyup.pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(tap(() => this.isLoading = true))
      .pipe(switchMap(searchTerm => this.service.getUserEmail(searchTerm)))
      .pipe(tap(() => this.isLoading = false))
      .subscribe(user => this.foundUser = user);
  }
}
