import { Customer } from '@prisma/client'
import { CustomerRepository } from '../repository/CustomerRepository'

export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async getAllCustomers() {
    const customers = await this.customerRepository.getAll()
  }

  async getCustomerById(id: string) {}

  async createCustomer(customer: Customer) {}

  async updateCustomer(id: string, customer: Customer) {}

  async deleteCustomer(id: string) {}
}
