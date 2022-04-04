import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import AuthRepository from 'App/Repositories/Auth'
import LoginValidator from 'App/Validators/User/LoginValidator'

export default class AuthController {
  public async auth({ request, response, auth }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)
    const token = 
      await AuthRepository.login({ key: email, password, role: 'user', auth })

    return response.created(token)
  }
}
