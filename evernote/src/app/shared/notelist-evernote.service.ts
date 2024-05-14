import { Injectable } from '@angular/core';
import {Notelist} from "./notelist";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Note} from "./note";

@Injectable({
  providedIn: 'root'
})
export class NotelistEvernoteService {

  private api = 'http://evernote.s2110456027.student.kwmhgb.at/api';
  //notelists: Notelist[] = [];

  constructor(private http:HttpClient) { }

  getAllNotelists() {
    return this.http.get<Array<Notelist>>(`${this.api}/notelists`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingleNotelist(id:string):Observable<Notelist>{
    return this.http.get<Notelist>(`${this.api}/notelists/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingleNote(id:string):Observable<Note>{
    return this.http.get<Note>(`${this.api}/notes/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  private errorHandler(error:Error|any) :Observable<any>{
    return throwError(error)
  }
}
