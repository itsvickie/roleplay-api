import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'User/ProfileController.store')
})
  .prefix('/v1/users')
