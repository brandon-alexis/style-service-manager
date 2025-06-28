import { Request, Response } from 'express'
import { handleError } from '../../../util/handleError'
import { CustomerService } from '../service/CustomerService'
import { Customer } from '../model/Customer'
import { v4 as uuid } from 'uuid'

export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  async getAllCustomer(req: Request, res: Response) {
    try {
      const foundCustomers = await this.customerService.getAllCustomers()

      res.status(200).json(foundCustomers)
    } catch (error) {
      if (error instanceof Error) {
        handleError(res, error.message, 404)
      }
    }
  }

  async getCustomerById(req: Request, res: Response) {
    const { id } = req.params

    try {
      const foundCustomer = await this.customerService.getCustomerById(id)

      res.status(200).json(foundCustomer)
    } catch (error) {
      if (error instanceof Error) {
        handleError(res, error.message, 404)
      }
    }
  }

  async createCustomer(req: Request, res: Response) {
    const { body } = req
    const { name, status } = body

    const customerId = uuid()
    const customer = new Customer(customerId, name, status)

    try {
      const createdCustomer =
        await this.customerService.createCustomer(customer)

      res
        .status(201)
        .json({ createdCustomer, message: 'Cliente creado con exito' })
    } catch (error) {
      if (error instanceof Error) {
        handleError(res, error.message, 404)
      }
    }
  }

  async updateCustomer(req: Request, res: Response) {
    const { params, body } = req
    const { name, status } = body
    const { id } = params

    const customer = new Customer(id, name, status)

    try {
      const updatedCustomer = await this.customerService.updateCustomer(
        id,
        customer,
      )

      res
        .status(201)
        .json({ updatedCustomer, message: 'Cliente actualizado con exito' })
    } catch (error) {
      if (error instanceof Error) {
        handleError(res, error.message, 404)
      }
    }
  }

  async deleteCustomer(req: Request, res: Response) {
    const { id } = req.params

    try {
      await this.customerService.deleteCustomer(id)

      res.status(204).json({ message: 'Cliente eliminado con exito ' })
    } catch (error) {
      if (error instanceof Error) {
        handleError(res, error.message, 404)
      }
    }
  }
}
