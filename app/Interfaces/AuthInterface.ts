import { AuthContract, GuardsList } from '@ioc:Adonis/Addons/Auth'

export interface CreateAuth {
  key: string
  password: string
  role: keyof GuardsList
  auth: AuthContract
}
