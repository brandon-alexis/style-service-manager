import { Customer } from '../model/Customer'
import { CustomerRepository } from '../repository/CustomerRepository'

export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async getAllCustomers(): Promise<Customer[]> {
    const customers: Customer[] = await this.customerRepository.getAll()

    return customers
  }

  async getCustomerById(id: string): Promise<Customer> {
    const foundCustomer = await this.customerRepository.getById(id)

    if (!foundCustomer) {
      throw new Error('El cliente no encontrado')
    }

    return foundCustomer
  }

  async createCustomer(customer: Customer): Promise<Customer> {
    const createdCustomer = await this.customerRepository.create(customer)

    if (!createdCustomer) {
      throw new Error('El cliente no pudo ser creado')
    }

    return createdCustomer
  }

  async updateCustomer(id: string, customer: Customer): Promise<Customer> {
    const updatedCustomer = await this.customerRepository.update(id, customer)

    if (!updatedCustomer) {
      throw new Error('El cliente no pudo ser actualido')
    }

    return updatedCustomer
  }

  async deleteCustomer(id: string) {
    const isDeletedCustomer = await this.customerRepository.delete(id)

    if (!isDeletedCustomer) {
      throw new Error('El cliente no pudo ser eliminado')
    }
  }
}
