import test from 'japa'
import supertest from 'supertest'
import Database from '@ioc:Adonis/Lucid/Database'

import GenerateToken from 'Database/utils/GenerateToken'
import User from 'App/Models/User'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/v1`

test.group('Get User Profile', (group) => {
  let user: User
  let accessToken: string

  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()

    const userAndToken = await GenerateToken.createOrFindUserAndToken()
    user = userAndToken.user
    accessToken = userAndToken.token.token
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('It should return ', async (assert) => {
    const { body } = await supertest(BASE_URL)
      .get('/users/profile')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)

    assert.equal(body.id, user.id)
    assert.notExists(body.password)
  })
})
