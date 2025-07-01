export class CustomerAlreadyExists extends Error {
  constructor() {
    super('El cliente ya existe')
  }
}
