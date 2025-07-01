import { PrismaClient } from '@prisma/client'
import { Service } from '../model/Service'
import { ServiceRepository } from './ServiceRepository'

export class PrismaServiceRepository implements ServiceRepository {
  private readonly client: PrismaClient

  constructor() {
    this.client = new PrismaClient()
  }

  async getAll(): Promise<Service[]> {
    const serviceList = await this.client.service.findMany()

    const services = serviceList.map(
      (service) => new Service(service.id, service.name, service.price),
    )

    return services
  }

  async getById(id: string): Promise<Service | null> {
    const foundService = await this.client.service.findFirst({ where: { id } })

    if (!foundService) {
      return null
    }

    const service = new Service(
      foundService.id,
      foundService.name,
      foundService.price,
    )

    return service
  }

  async create(service: Service): Promise<Service> {
    const createdService = await this.client.service.create({
      data: {
        id: service.getId(),
        name: service.getName(),
        price: service.getPrice(),
      },
    })

    const newService = new Service(
      createdService.id,
      createdService.name,
      createdService.price,
    )

    return newService
  }

  async update(id: string, service: Service): Promise<Service> {
    const updatedService = await this.client.service.update({
      where: { id },
      data: {
        id: service.getId(),
        name: service.getName(),
        price: service.getPrice(),
      },
    })

    const newService = new Service(
      updatedService.id,
      updatedService.name,
      updatedService.price,
    )

    return newService
  }

  async delete(id: string): Promise<boolean> {
    const deletedCustomer = await this.client.service.delete({ where: { id } })

    return deletedCustomer == null
  }
}
