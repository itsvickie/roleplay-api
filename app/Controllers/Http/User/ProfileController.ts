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
}
