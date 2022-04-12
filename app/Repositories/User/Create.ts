import crypto from 'crypto'

import User from 'App/Models/User'

import { CreateUser } from 'App/Utils/Interfaces/UserInterface'
import { MailQueue } from 'App/Services/Queue'

export default class CreateUserRepository {
  public static async store(infos: CreateUser) {
    try {
      const user = await User.create(Object.assign(infos, { confirmCode: crypto.randomUUID() }))

      await MailQueue.add({ code: user.confirmCode, email: user.email })
    } catch (error) {
      console.log(error)
    }
  }

  public static async confirmAccount(code: string) {
    const user = await User.findBy('confirm_code', code)
    if (!user) return { status: 404 }

    await user.merge({ status: true }).save()
    return { status: 200 }
  }
}
