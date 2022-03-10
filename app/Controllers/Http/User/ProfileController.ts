import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { CreateUser } from 'App/Utils/Interfaces/UserInterface'
import UserRepository from 'App/Repositories/User'

export default class ProfileController {
  public async store({ request, response }: HttpContextContract) {
    const userPayload: CreateUser = 
      request.only(['email', 'username', 'password', 'avatar'])

    await UserRepository.store(userPayload)

    return response.created()
  }
}
