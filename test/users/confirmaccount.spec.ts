import test from 'japa'
import supertest from 'supertest'
import Database from '@ioc:Adonis/Lucid/Database'

import { UserFactory } from 'Database/factories/User'
import User from 'App/Models/User'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/v1`

test.group('Confirm a new account', (group) => {
  let user: User

  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()

    user = await UserFactory.create()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('It should confirm a new account by code', async (assert) => {
    await supertest(BASE_URL)
      .post(`/users/confirm?code=${user.confirmCode}`)
      .expect(200)

    await user.refresh()
    assert.isTrue(user.status)
  })

  test('It should fail if confirm code dont exists', () => {
    supertest(BASE_URL)
      .post(`/users/confirm?code=0`)
      .expect(404)
  })
})