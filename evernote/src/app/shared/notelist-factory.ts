import {Notelist} from "./notelist";

export class NotelistFactory {

  static empty() : Notelist {
    return new Notelist(
      0,'',false,0, [], []
    )
  }

  static fromObject (rawNotelist:any):Notelist {
    return new Notelist(
      rawNotelist.id,
      rawNotelist.name,
      rawNotelist.visibility,
      rawNotelist.creator_id
    );
  }
}
