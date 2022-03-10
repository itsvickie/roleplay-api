import User from 'App/Models/User'
import test from 'japa'
import supertest from 'supertest'
import Database from '@ioc:Adonis/Lucid/Database'

import { CreateUser } from 'App/Utils/Interfaces/UserInterface'
import { UserFactory } from 'Database/factories/User'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/v1`

test.group('Create a new user', (group) => {
  const userBody: CreateUser = {
    email: 'email@email.com',
    username: 'new_username',
    password: 'new_password',
    avatar: 'https://i.pinimg.com/474x/e9/7a/f1/e97af112a4bd4aeeafac8e7e36484608.jpg'
  }

  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

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

  test('It should fail if email is already in use', async (assert) => {
    await UserFactory.merge({ email: userBody.email }).create()

    const { body } = await supertest(BASE_URL)
      .post('/users')
      .send(userBody)
      .expect(422)
    
    assert.deepEqual(body.errors[0], { 
      rule: 'unique', 
      field: 'email', 
      message: 'Email já em uso' 
    })
  })

  test('It should fail if username is already in use', async (assert) => {
    await UserFactory.merge({ username: userBody.username }).create()

    const { body } = await supertest(BASE_URL)
      .post('/users')
      .send(userBody)
      .expect(422)
    
    assert.deepEqual(body.errors[0], { 
      rule: 'unique', 
      field: 'username', 
      message: 'Username já em uso' 
    })
  })

  test('It should fail if email informed is invalid', async (assert) => {
    userBody.email = 'email'

    const { body } = await supertest(BASE_URL)
      .post('/users')
      .send(userBody)
      .expect(422)
    
    assert.deepEqual(body.errors[0], { 
      rule: 'email', 
      field: 'email', 
      message: 'Email inválido' 
    })
  })
})
