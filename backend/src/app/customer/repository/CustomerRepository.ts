import { Customer } from '../model/Customer'

export interface CustomerRepository {
  getAll(): Promise<Customer[]>
  getById(id: string): Promise<Customer | null>
  getByName(name: string): Promise<Customer | null>
  create(customer: Customer): Promise<Customer>
  update(id: string, customer: Customer): Promise<Customer>
  delete(id: string): Promise<boolean>
}
