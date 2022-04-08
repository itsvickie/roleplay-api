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

  test('It should fail if user not activated your account yet', async (assert) => {
    await user.merge({ status: false }).save()

    const { body } = await supertest(BASE_URL)
      .post('/auth')
      .send({
        email: user.email,
        password,
      })
      .expect(403)

    assert.equal(body.error.message, 'Usuário desativado. Cheque seu e-mail para ativá-lo!')
  })

  test('It should fail if credentials are invalid', async (assert) => {
    const { body } = await supertest(BASE_URL)
      .post('/auth')
      .send({
        email: user.email,
        password: 'invalid_password',
      })
      .expect(401)

    assert.equal(body.error.message, 'Credenciais inválidas')
  })
})
