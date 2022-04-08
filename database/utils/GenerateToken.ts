import User from 'App/Models/User'
import { UserFactory } from 'Database/factories/User'
import supertest from 'supertest'

export default class GenerateToken {
  public static async createOrFindUserAndToken(user?: User) {
    if (!user) user = await UserFactory.merge({ 
      password: 'User123', 
      status: true 
    }).create()

    const { body } = 
      await supertest(`http://${process.env.HOST}:${process.env.PORT}/v1`)
        .post('/auth')
        .send({
          email: user.email,
          password: 'User123'
        })
  
    return body
  }
}
