import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from "../shared/category";
import {User} from "../shared/user";
import {Notelist} from "../shared/notelist";
import {NotelistEvernoteService} from "../shared/notelist-evernote.service";
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs";
import {NgClass} from "@angular/common";
import {CategorySearchComponent} from "../category-search/category-search.component";
import {ShareToUserComponent} from "../share-to-user/share-to-user.component";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Note} from "../shared/note";

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    NgClass,
    CategorySearchComponent,
    ShareToUserComponent
  ],
  templateUrl: './category-list.component.html',
  styles: ``
})
export class CategoryListComponent implements OnInit {
  category: Category| undefined = undefined;
  notes: Note[]| undefined = undefined;
  ngOnInit(): void {
    console.log(this.category)
  }

  constructor(
    private fb: FormBuilder,
    private service: NotelistEvernoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  protected readonly Category = Category;

  categorySelected(category: Category) {
    console.log(category);
    if(category.id) {
      this.service.getCategoryById(category.id.toString()).subscribe((cat: Category[]) => {
        this.category = cat[0];
        this.notes = cat[0].notes;
        this.ngOnInit();
      });
    }
  }

  protected readonly Note = Note;
}
