
export class ErrorMessage {
  constructor(public forControl: string,
              public forValidator: string,
              public text: string) {}
}

export const NotelistFormErrorMessages =[
  new ErrorMessage('name','required',
    'Ein Notizbuch-Name muss angegeben werden')

]

