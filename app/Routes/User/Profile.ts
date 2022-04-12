import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'User/ProfileController.store')
  Route.post('/confirm', 'User/ProfileController.confirmAccount')
  Route.get('/profile', 'User/ProfileController.getProfile').middleware('user_guard') 
})
  .prefix('/v1/users')
