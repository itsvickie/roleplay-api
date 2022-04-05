import { Exception } from '@adonisjs/core/build/standalone'
import { CustomExceptionCodes } from 'App/Exceptions/CustomExceptionCodes'
import { CreateAuth } from 'App/Interfaces/AuthInterface'

export default class AuthRepository {
  public static async login({ key, password, role, auth }: CreateAuth) {
    try {
      const token = await auth.use(role).attempt(key, password)
      if (!token.user.status) 
        throw new Exception(CustomExceptionCodes.E_DESACTIVED_USER)

      return { user: token.user, token }
    } catch (error) {
      if (error.message !== CustomExceptionCodes.E_DESACTIVED_USER) 
        error.message = CustomExceptionCodes.E_INVALID_CREDENTIALS
      
      throw new Exception(error.message)
    }
  }
}
