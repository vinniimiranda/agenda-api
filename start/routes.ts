import Route from '@ioc:Adonis/Core/Route'

/** Auth routes */
Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')
Route.post('/logout', async ({ auth }) => {
  await auth.use('api').logout()
})

/** Doctors routes */
Route.resource('doctors', 'DoctorsController')

/** Patients routes */
Route.resource('patients', 'PatientsController')

/** Insurance routes */
Route.resource('insurances', 'InsurancesController')

/** Insurance routes */
Route.resource('appointments', 'AppointmentsController')

/** Users routes */
Route.get('users', 'UsersController.index')

