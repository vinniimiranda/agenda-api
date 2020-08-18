import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Patient from 'App/Models/Patient'

export default class PatientsController {
  public async index ({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const { name, document, status } = request.all()

    if (name) {
      return await Patient.query().where('name', 'like', `${name}%`).paginate(page, limit)
    }
    if (document) {
      return await Patient.query().where('document', 'like', `${document}%`).paginate(page, limit)
    }
    if (status) {
      return await Patient.query().where('status', status).paginate(page, limit)
    }

    return await Patient.query().paginate(page, limit)
  }

  public async store ({ request }: HttpContextContract) {
    const data = request.all()
    return await Patient.create(data)
  }

  public async show ({ params }: HttpContextContract) {
    const { id } = params
    return await Patient.findOrFail(id)
  }

  public async update ({ params, request }: HttpContextContract) {
    const { id } = params
    const data = request.all()
    const patient = await Patient.findOrFail(id)

    patient.merge(data)

    return await patient.save()
  }

  public async destroy ({ params }: HttpContextContract) {
    const { id } = params
    const patient = await Patient.findOrFail(id)

    await patient.delete()
  }
}
