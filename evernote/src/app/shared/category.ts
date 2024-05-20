import {Note} from "./note";

export class Category {
  constructor(public id:number,
              public category:string,
              public notes?: Note[]) {
  }
}
