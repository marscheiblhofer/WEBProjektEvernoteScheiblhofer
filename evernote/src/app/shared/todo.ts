import {Notelist} from "./notelist";
import {Note} from "./note";
import {User} from "./user";

export class Todo {
  constructor(public id: number,
              public title: string,
              public visibility: boolean,
              public completed: boolean,
              public description?: string,
              public due_date?: Date,
              public notelist?: Notelist,
              public note?: Note,
              public responsible_person?: User
  ) {
  }
}
