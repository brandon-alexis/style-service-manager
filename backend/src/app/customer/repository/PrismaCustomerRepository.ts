import { PrismaClient } from '@prisma/client'

import { Customer } from '../model/Customer'
import { CustomerRepository } from './CustomerRepository'

export class PrismaCustomerRepository implements CustomerRepository {
  private readonly client: PrismaClient

  constructor() {
    this.client = new PrismaClient()
  }

  async getAll(): Promise<Customer[]> {
    const customerList = await this.client.customer.findMany()

    const customers: Customer[] = customerList.map(
      (customer) => new Customer(customer.id, customer.name, customer.status),
    )

    return customers
  }

  async getById(id: string): Promise<Customer | null> {
    const foundCustomer = await this.client.customer.findFirst({
      where: { id },
    })

    if (!foundCustomer) {
      return Promise.resolve(null)
    }

    const customer = new Customer(
      foundCustomer.id,
      foundCustomer.name,
      foundCustomer.status,
    )

    return customer
  }

  async create(customer: Customer): Promise<Customer> {
    const createdCustomer = await this.client.customer.create({
      data: {
        id: customer.getId(),
        name: customer.getName(),
        status: customer.getStatus(),
      },
    })

    const newCustomer = new Customer(
      createdCustomer.id,
      createdCustomer.name,
      createdCustomer.status,
    )

    return newCustomer
  }

  async update(id: string, customer: Customer): Promise<Customer> {
    const updatedCustomer = await this.client.customer.update({
      where: { id },
      data: {
        id: customer.getId(),
        name: customer.getName(),
        status: customer.getStatus(),
      },
    })

    const newCustomer = new Customer(
      updatedCustomer.id,
      updatedCustomer.name,
      updatedCustomer.status,
    )

    return newCustomer
  }

  async delete(id: string): Promise<boolean> {
    const deletedCustomer = await this.client.customer.delete({ where: { id } })

    return deletedCustomer == null
  }
}
