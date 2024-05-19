import {Notelist} from "./notelist";
import {Note} from "./note";
import {User} from "./user";

export class Todo {
  constructor(public id: number,
              public title: string,
              public visibility: boolean,
              public completed: boolean,
              public creator?: User,
              public description?: string,
              public due_date?: Date,
              public notelist?: Notelist,
              public note?: Note,
              public responsible_person?: User,
              public creator_id?: number,
              public notelist_id?: number,
              public note_id?: number,
              public responsible_person_id?: number,
  ) {
  }
}
