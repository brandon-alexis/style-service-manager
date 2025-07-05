import { Router } from 'express'
import { ServiceController } from '../controller/ServiceController'
import { Service } from '../model/Service'
import { ServiceService } from '../service/ServiceService'
import { ServiceRepository } from '../repository/ServiceRepository'
import { PrismaServiceRepository } from '../repository/PrismaServiceRepository'

const router: Router = Router()

const serviceRepository: ServiceRepository = new PrismaServiceRepository()
const serviceService: ServiceService = new ServiceService(serviceRepository)
const serviceController: ServiceController = new ServiceController(
  serviceService,
)

router
  .get('/', serviceController.getAllServices.bind(serviceController))
  .get('/:id', serviceController.getServiceById.bind(serviceController))
  .post('/', serviceController.createService.bind(serviceController))
  .put('/:id', serviceController.updatedService.bind(serviceController))
  .delete('/:id', serviceController.deleteService.bind(serviceController))

export { router as serviceRouter }
