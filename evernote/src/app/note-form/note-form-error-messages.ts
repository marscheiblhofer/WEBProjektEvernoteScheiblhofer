
export class ErrorMessage {
  constructor(public forControl: string,
              public forValidator: string,
              public text: string) {}
}

export const NoteFormErrorMessages =[
  new ErrorMessage('title','required',
    'Ein Notiz-Name muss angegeben werden')
]

