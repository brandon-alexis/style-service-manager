export class serviceAlreadyExists extends Error {
  constructor() {
    super('El servicio ya existe')
  }
}
