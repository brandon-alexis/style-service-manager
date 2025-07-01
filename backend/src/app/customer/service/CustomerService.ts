import { CustomerAlreadyExists } from '../exception/CustomerAlreadyExists'
import { CustomerNotDeleted } from '../exception/CustomerNotDeleted'
import { CustomerNotFound } from '../exception/CustomerNotFound'
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
      throw new CustomerNotFound()
    }

    return foundCustomer
  }

  async createCustomer(customer: Customer): Promise<Customer> {
    const customers = await this.getAllCustomers()

    const isCustomerCreated = customers.some(
      (_customer) => _customer.getName() === customer.getName(),
    )

    if (!isCustomerCreated) {
      throw new CustomerAlreadyExists()
    }

    const createdCustomer = await this.customerRepository.create(customer)

    return createdCustomer
  }

  async updateCustomer(id: string, customer: Customer): Promise<Customer> {
    await this.getCustomerById(id)

    const updatedCustomer = await this.customerRepository.update(id, customer)

    return updatedCustomer
  }

  async deleteCustomer(id: string): Promise<void> {
    await this.getCustomerById(id)

    const isDeletedCustomer = await this.customerRepository.delete(id)

    if (!isDeletedCustomer) {
      throw new CustomerNotDeleted()
    }
  }
}
