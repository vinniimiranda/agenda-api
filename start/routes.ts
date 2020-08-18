import Route from '@ioc:Adonis/Core/Route'

/** Auth routes */
Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')
Route.post('/logout', async ({ auth }) => {
  await auth.use('api').logout()
})

/** Doctors routes */
Route.post('doctors', 'DoctorsController.store')
Route.get('doctors', 'DoctorsController.index')
Route.get('doctors/:id', 'DoctorsController.show')
Route.put('doctors/:id', 'DoctorsController.update')
Route.delete('doctors/:id', 'DoctorsController.destroy')

/** Patients routes */
Route.post('patients', 'PatientsController.store')
Route.get('patients', 'PatientsController.index')
Route.get('patients/:id', 'PatientsController.show')
Route.put('patients/:id', 'PatientsController.update')
Route.delete('patients/:id', 'PatientsController.destroy')

/** Insurance routes */
Route.post('insurances', 'InsurancesController.store')
Route.get('insurances', 'InsurancesController.index')
Route.get('insurances/:id', 'InsurancesController.show')
Route.put('insurances/:id', 'InsurancesController.update')
Route.delete('insurances/:id', 'InsurancesController.destroy')

/** Users routes */
Route.get('users', 'UsersController.index').middleware('auth')

