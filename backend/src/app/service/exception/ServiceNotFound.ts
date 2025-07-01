export class ServiceNotFound extends Error {
  constructor() {
    super('El servicio ya existe')
  }
}
