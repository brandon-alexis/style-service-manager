import { Request, Response } from 'express'
import { handleError } from '../../../util/handleError'

export const getAllCustomer = (req: Request, res: Response) => {
  try {
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, 'No hay clientes registrados', 400)
    }
  }
}
