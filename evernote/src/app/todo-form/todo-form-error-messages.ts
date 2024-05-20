
export class ErrorMessage {
  constructor(public forControl: string,
              public forValidator: string,
              public text: string) {}
}

export const TodoFormErrorMessages =[
  new ErrorMessage('name','required',
    'Todo ist nicht ganz korrekt')

]

