import { Response } from 'express'

export const handleError = (res: Response, message: string, code: number) => {
  res.status(code).json({ message, type: 'Error' })
}
