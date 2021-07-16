import { HttpErrorCodes } from './../enums/statusCodes.enum'
export default class HttpException extends Error {
  message: string
  status: HttpErrorCodes
  constructor(message: string, status: HttpErrorCodes) {
    super()
    this.message = message
    this.status = status
  }
}
