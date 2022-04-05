import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email()
    ]),
    password: schema.string({ trim: true })
  })

  public messages = {
    'email.required': 'O email deve ser preenchido',
    'email.email': 'Email inválido',

    'password.required': 'A senha deve ser preenchida'
  }
}
