import {Note} from "./note";

export class NoteFactory {

  static empty() : Note {
    return new Note(
      0,'','',0,[{id:0,url:'',title:''}], []
    )
  }

  static fromObject (rawNote:any):Note {
    return new Note(
      rawNote.id,
      rawNote.title,
      rawNote.description,
      rawNote.notelist_id,
      rawNote.images,
      rawNote.categories
    );
  }
}
