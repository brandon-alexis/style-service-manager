import { serviceAlreadyExists } from '../exception/ServiceAlreadyExists'
import { Service } from '../model/Service'
import { ServiceRepository } from '../repository/ServiceRepository'

export class ServiceService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async getAllServices(): Promise<Service[]> {
    const services = await this.serviceRepository.getAll()

    return services
  }

  async getServiceById(id: string): Promise<Service> {
    const foundService = await this.serviceRepository.getById(id)

    if (!foundService) {
      throw new Error('Servicio no encontrado')
    }

    return foundService
  }

  async createService(service: Service): Promise<Service> {
    const services = await this.getAllServices()

    const isServiceCreated = services.some(
      (_service) => _service.getName() == service.getName(),
    )

    if (!isServiceCreated) {
      throw new serviceAlreadyExists()
    }

    const createdService = await this.serviceRepository.create(service)

    return createdService
  }

  async updateService(id: string, service: Service): Promise<Service> {
    await this.getServiceById(id)

    const updatedService = await this.serviceRepository.update(id, service)

    return updatedService
  }

  async deleteService(id: string): Promise<void> {
    await this.getServiceById(id)

    const isDeletedService = await this.serviceRepository.delete(id)

    if (!isDeletedService) {
    }
  }
}
