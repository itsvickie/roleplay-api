import { AuthContract } from '@ioc:Adonis/Addons/Auth'

export default class FetchUserRepository {
  public static async getProfile(auth: AuthContract) {
    return auth.user
  }
}
