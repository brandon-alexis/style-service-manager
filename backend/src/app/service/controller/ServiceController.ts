import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'

import { ServiceService } from '../service/ServiceService'
import { handleError } from '../../../util/handleError'
import { ServiceNotFound } from '../exception/ServiceNotFound'
import { Service } from '../model/Service'
import { ServiceNotDeleted } from '../exception/ServiceNotDeleted'

export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  async getAllServices(req: Request, res: Response) {
    try {
      const services = await this.serviceService.getAllServices()

      res.status(200).json(services)
    } catch (error) {
      if (error instanceof Error) {
        handleError(res, error.message, 404)
      }

      handleError(res, 'Ocurrio un error inesperado', 500)
    }
  }

  async getServiceById(req: Request, res: Response) {
    const { id } = req.params

    try {
      const service = await this.serviceService.getServiceById(id)

      res.json(200).json({ data: service })
    } catch (error) {
      if (error instanceof ServiceNotFound) {
        handleError(res, error.message, 404)
      }

      handleError(res, 'Ocurrio un eror inesperado', 500)
    }
  }

  async createService(req: Request, res: Response) {
    const { name, price } = req.body

    const serviceId = uuid()
    const service = new Service(serviceId, name, price)

    try {
      const createdService = await this.serviceService.createService(service)

      res
        .status(201)
        .json({ data: createdService, message: 'Servicio creado con exito' })
    } catch (error) {
      if (error instanceof Error) {
        handleError(res, error.message, 404)
      }

      handleError(res, 'Ocurrio un error inesperado', 500)
    }
  }

  async updatedService(req: Request, res: Response) {
    const { id } = req.params
    const { name, price } = req.body

    const service = new Service(id, name, price)

    try {
      const updatedService = await this.serviceService.updateService(
        id,
        service,
      )

      res.status(201).json({
        data: updatedService,
        message: 'Servicio actualizado con exito',
      })
    } catch (error) {
      if (error instanceof ServiceNotFound) {
        handleError(res, error.message, 404)
      }

      handleError(res, 'Ocurrio un error inesperado', 500)
    }
  }

  async deleteService(req: Request, res: Response) {
    const { id } = req.params

    try {
      await this.serviceService.deleteService(id)

      res.status(200).json({ message: 'Servicio eliminado con exito' })
    } catch (error) {
      if (error instanceof ServiceNotDeleted) {
        handleError(res, error.message, 400)
      }

      handleError(res, 'Ocurrio un error inesperado', 500)
    }
  }
}
