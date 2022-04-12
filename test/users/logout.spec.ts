import test from 'japa'
import supertest from 'supertest'
import Database from '@ioc:Adonis/Lucid/Database'

import GenerateToken from 'Database/utils/GenerateToken'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/v1`

test.group('Delete Auth User', (group) => {
  let accessToken: string

  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()

    const userAndToken = await GenerateToken.createOrFindUserAndToken()
    accessToken = userAndToken.token.token
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('It should signout', async () => {
    await supertest(BASE_URL)
      .delete('/auth')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)

    await supertest(BASE_URL)
      .get('/users/profile')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401)
  })
})
