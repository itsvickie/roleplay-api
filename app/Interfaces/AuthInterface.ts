import { AuthContract, GuardsList, OpaqueTokenContract } from '@ioc:Adonis/Addons/Auth'
import User from 'App/Models/User'

export interface CreateAuth {
  key: string
  password: string
  role: keyof GuardsList
  auth: AuthContract
}

export interface ReturnUserAuth {
  user: User
  token: OpaqueTokenContract<User>
}
