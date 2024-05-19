import { Injectable } from '@angular/core';
import {Notelist} from "./notelist";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Note} from "./note";
import {Todo} from "./todo";

@Injectable({
  providedIn: 'root'
})
export class NotelistEvernoteService {

  private api = 'http://evernote.s2110456027.student.kwmhgb.at/api';

  constructor(private http:HttpClient) { }

  //Notelists
  getAllNotelists() {
    return this.http.get<Array<Notelist>>(`${this.api}/notelists`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingleNotelist(id:string):Observable<Notelist>{
    return this.http.get<Notelist>(`${this.api}/notelists/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  removeNotelist(id:number):Observable<any> {
    return this.http.delete<Notelist>(`${this.api}/notelists/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  createNotelist(notelist:Notelist):Observable<any> {
    return this.http.post<Notelist>(`${this.api}/notelists`, notelist)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }
  updateNotelist(notelist:Notelist):Observable<any> {
    return this.http.put<Notelist>(`${this.api}/notelists/${notelist.id}`, notelist)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  //Notes
  removeNote(id:number):Observable<any>{
    return this.http.delete<Note>(`${this.api}/notes/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingleNote(id:string):Observable<Note>{
    return this.http.get<Note>(`${this.api}/notes/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  createNote(note:Note):Observable<any> {
    return this.http.post<Note>(`${this.api}/notes`, note)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }
  updateNote(note:Note):Observable<any> {
    return this.http.put<Note>(`${this.api}/notes/${note.id}`, note)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  //Todos

  getAllTodos() {
    return this.http.get<Array<Todo>>(`${this.api}/todos`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }
  createTodo(todo:Todo):Observable<any> {
    return this.http.post<Todo>(`${this.api}/todos`, todo)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  private errorHandler(error:Error|any) :Observable<any>{
    return throwError(error)
  }
}
