import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'

const SMTP_FROM = Env.get('SMTP_FROM')
const CONFIRM_ACCOUNT_URL = Env.get('CONFIRM_ACCOUNT_URL')

export default class Account {
  public static async confirmAccount(code: string, email: string) {
    await Mail.send((message) => {
      message
        .from(SMTP_FROM)
        .to(email)
        .subject('Confirme sua conta!')
        .htmlView('emails/confirmaccount', { 
          link: `${CONFIRM_ACCOUNT_URL}/${code}` 
        })
    })
  }
}
