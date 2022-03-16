import Queue from 'bull'
import Env from '@ioc:Adonis/Core/Env'

import AccountMail from '../Email/Account'

const REDIS_URI = Env.get('REDIS_URI')
const NODE_ENV = Env.get('NODE_ENV')

const MailQueue = new Queue('mail', REDIS_URI)

MailQueue.process(async (job) => {
  const { code, email } = job.data
  if (NODE_ENV !== 'testing') await AccountMail.confirmAccount(code, email)
})

export { MailQueue }
