import {Image} from "./image";
export {Image} from "./image";
import {Category} from "./category";
export {Category} from "./category";

export class Note {
  constructor(public id:number,
              public title:string,
              public description:string,
              public notelist_id: number,
              public images?: Image[],
              public categories?: Category[]
  ) {
  }
}
