import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from "../shared/category";
import {NotelistEvernoteService} from "../shared/notelist-evernote.service";
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-category-search',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './category-search.component.html',
  styles: ``
})
export class CategorySearchComponent {
  keyup = new EventEmitter<string>();
  foundCategory: Category[] = [];
  isLoading = false;
  @Output() categorySelected = new EventEmitter<Category>();
  @Input() category!: Category;

  constructor(private service:NotelistEvernoteService) {
  }

  ngOnInit() {
    this.keyup.pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(tap(() => this.isLoading = true))
      .pipe(switchMap(searchTerm => this.service.getSearchCategory(searchTerm)))
      .pipe(tap(() => this.isLoading = false))
      .subscribe(user => {
        this.foundCategory = user;
      });
    console.log(this.foundCategory);
  }
}
