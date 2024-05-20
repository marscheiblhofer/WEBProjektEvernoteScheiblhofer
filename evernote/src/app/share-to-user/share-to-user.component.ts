import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, switchAll, switchMap, tap} from "rxjs";
import {User} from "../shared/user";
import {NotelistEvernoteService} from "../shared/notelist-evernote.service";
import {NgClass, NgForOf} from "@angular/common";
import {Notelist} from "../shared/notelist";

@Component({
  selector: 'app-share-to-user',
  standalone: true,
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './share-to-user.component.html',
  styles: ``
})
export class ShareToUserComponent implements OnInit{
  keyup = new EventEmitter<string>();
  foundUser: User[] = [];
  isLoading = false;
  @Output() userSelected = new EventEmitter<User>();
  @Input() notelist!: Notelist;

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
