import User from 'App/Models/User'
import test from 'japa'
import supertest from 'supertest'

import { CreateUser } from 'App/Utils/Interfaces/UserInterface'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/v1`

test.group('Create a new user', () => {
  const userBody: CreateUser = {
    email: 'email@email.com',
    username: 'new_username',
    password: 'new_password',
    avatar: 'https://i.pinimg.com/474x/e9/7a/f1/e97af112a4bd4aeeafac8e7e36484608.jpg'
  }

  test('It should create an user', async (assert) => {
    await supertest(BASE_URL)
      .post('/users')
      .send(userBody)
      .expect(201)

    const verifyUser = await User.findBy('email', userBody.email)
    assert.exists(verifyUser)
    if (verifyUser) {
      assert.equal(verifyUser.email, userBody.email)
      assert.equal(verifyUser.avatar, userBody.avatar)
      assert.equal(verifyUser.username, userBody.username)
    }
  })
})
