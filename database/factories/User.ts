import crypto from 'crypto'
import Factory from '@ioc:Adonis/Lucid/Factory'

import User from 'App/Models/User'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    username: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    avatar: faker.internet.url(),
    confirmCode: crypto.randomUUID(),
    status: false,
  }
}).build()
