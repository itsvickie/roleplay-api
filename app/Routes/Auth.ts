import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'User/AuthController.auth')
})
  .prefix('/v1/auth')
