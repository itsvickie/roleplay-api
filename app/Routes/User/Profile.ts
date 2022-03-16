import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'User/ProfileController.store')
  Route.post('/confirm', 'User/ProfileController.confirmAccount')
})
  .prefix('/v1/users')
