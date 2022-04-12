import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'User/AuthController.auth')
  Route.delete('/', 'User/AuthController.logout')
})
  .prefix('/v1/auth')
  
