import {Todo} from "./todo";

export class TodoFactory {

  static empty() : Todo {
    return new Todo(
      0,'', false, false, undefined,'',
      undefined, undefined, undefined, undefined
    )
  }

  static fromObject (rawTodo:any):Todo {
    return new Todo(
      rawTodo.id,
      rawTodo.title,
      rawTodo.visibility,
      rawTodo.completed,
      rawTodo.creator_id,
      rawTodo.description,
      rawTodo.due_date,
      rawTodo.notelist_id,
      rawTodo.note_id,
      rawTodo.responsible_person_id,

    );
  }
}
