import { Response } from 'express'

export const handleError = (res: Response, message?: string, code?: number) => {
  const errorMessage: string = message ?? 'Ocurrio un error inesperado'
  const errorCode: number = code ?? 500

  res.status(errorCode).json({ message: errorMessage, type: 'Error' })
}
