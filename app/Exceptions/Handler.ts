import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomExceptionCodes } from './CustomExceptionCodes'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    if (error.message === CustomExceptionCodes.E_DESACTIVED_USER) {
      return ctx.response
        .status(403)
        .send({ error: { message: 'Usuário desativado. Cheque seu e-mail para ativá-lo!' } })
    }

    if (error.message === CustomExceptionCodes.E_INVALID_CREDENTIALS) {
      return ctx.response
        .status(401)
        .send({ error: { message: 'Credenciais inválidas' } })
    }

    return super.handle(error, ctx)
  }
}
