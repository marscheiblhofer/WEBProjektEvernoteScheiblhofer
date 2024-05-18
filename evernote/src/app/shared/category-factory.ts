import {Category} from "./category";

export class CategoryFactory {
  static empty() : Category {
    return new Category(
      0,''
    )
  }

  static fromObject (rawCategory:any):Category {
    return new Category(
      rawCategory.id,
      rawCategory.category
    );
  }
}


