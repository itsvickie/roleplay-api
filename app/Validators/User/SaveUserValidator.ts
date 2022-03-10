import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SaveUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({ trim: true }, [
      rules.minLength(6),
      rules.maxLength(255),
      rules.unique({ table: 'users', column: 'username' }) 
    ]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' })
    ]),
    password: schema.string({ trim: true }, [
      rules.minLength(8),
      rules.maxLength(255)
    ]),
    avatar: schema.string.optional({ trim: true })
  })

  public messages = {
    'username.required': 'O username deve ser preenchido',
    'username.unique': 'Username já em uso',
    'username.minLength': 'O username deve conter entre 6 a 255 caracteres',
    'username.maxLength': 'O username deve conter entre 6 a 255 caracteres',

    'email.required': 'O email deve ser preenchido',
    'email.unique': 'Email já em uso',
    'email.email': 'Email inválido',

    'password.required': 'A senha deve ser preenchido',
    'password.minLength': 'A senha deve conter entre 8 a 255 caracteres',
    'password.maxLength': 'A senha deve conter entre 8 a 255 caracteres',
  }
}
