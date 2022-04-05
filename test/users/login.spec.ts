import test from 'japa'
import supertest from 'supertest'
import Database from '@ioc:Adonis/Lucid/Database'

import User from 'App/Models/User'
import { UserFactory } from 'Database/factories/User'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/v1`

test.group('Auth User', (group) => {
  const password = 'new_pass'
  let user: User

  group.beforeEach(async () => {
    user = await UserFactory.merge({ password, status: true }).create()
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('It should authenticate an user', async (assert) => {
    const { body } = await supertest(BASE_URL)
      .post('/auth')
      .send({
        email: user.email,
        password,
      })
      .expect(201)

    assert.isDefined(body.token.token)
    assert.isDefined(body.user)
    assert.equal(body.user.id, user.id)
  })
})
