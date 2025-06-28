import { Router } from 'express'
import { CustomerController } from '../controller/CustomerController'
import { CustomerService } from '../service/CustomerService'
import { CustomerRepository } from '../repository/CustomerRepository'
import { PrismaCustomerRepository } from '../repository/PrismaCustomerRepository'

const router: Router = Router()
const customerRepository: CustomerRepository = new PrismaCustomerRepository()
const customerService: CustomerService = new CustomerService(customerRepository)
const customerController: CustomerController = new CustomerController(
  customerService,
)

router
  .get('/', customerController.getAllCustomer.bind(customerController))
  .get('/:id', customerController.getCustomerById.bind(customerController))
  .post('/', customerController.createCustomer.bind(customerController))
  .put('/:id', customerController.updateCustomer.bind(customerController))
  .delete('/:id', customerController.deleteCustomer.bind(customerController))

export { router as customerRouter }
