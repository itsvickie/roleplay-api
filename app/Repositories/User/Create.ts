import User from 'App/Models/User'
import { CreateUser } from 'App/Utils/Interfaces/UserInterface'

export default class CreateUserRepository {
  public static async store(infos: CreateUser) {
    await User.create(infos)
  }
}
