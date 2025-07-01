export class CustomerNotDeleted extends Error {
  constructor() {
    super('El cliente no pudo ser eliminado')
  }
}
