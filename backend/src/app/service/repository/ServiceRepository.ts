import { Service } from '../model/Service'

export interface ServiceRepository {
  getAll(): Promise<Service[]>
  getById(id: string): Promise<Service | null>
  create(service: Service): Promise<Service>
  update(id: string, service: Service): Promise<Service>
  delete(id: string): Promise<boolean>
}
