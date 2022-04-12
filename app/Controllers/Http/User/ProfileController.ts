import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { CreateUser } from 'App/Utils/Interfaces/UserInterface'
import UserRepository from 'App/Repositories/User'
import SaveUserValidator from 'App/Validators/User/SaveUserValidator'

export default class ProfileController {
  public async store({ request, response }: HttpContextContract) {
    const userPayload: CreateUser = await request.validate(SaveUserValidator)

    await UserRepository.store(userPayload)

    return response.created()
  }

  public async confirmAccount({ request, response }: HttpContextContract) {
    const { code } = request.qs()

    const { status } = await UserRepository.confirmAccount(code)

    return response.status(status)
  }

  public async getProfile({ response, auth }: HttpContextContract) {
    const user = await UserRepository.getProfile(auth)
    return response.ok(user)
  }
}
