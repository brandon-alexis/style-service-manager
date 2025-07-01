export class ServiceNotDeleted extends Error {
  constructor() {
    super('El servicio no pudo ser elimiado')
  }
}
