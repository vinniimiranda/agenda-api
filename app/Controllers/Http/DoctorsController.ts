import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Doctor from 'App/Models/Doctor'

export default class DoctorsController {
  public async index ({ request }: HttpContextContract) {
    const { name, document, status } = request.all()
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    if (name) {
      return await Doctor.query().where('name', 'like', `${name}%`).paginate(page, limit)
    }
    if (document) {
      return await Doctor.query().where('document', 'like', `${document}%`).paginate(page, limit)
    }
    if (status) {
      return await Doctor.query().where('status', status).paginate(page, limit)
    }
    return await Doctor.query().paginate(page, limit)
  }

  public async store ({ request }: HttpContextContract) {
    const data = request.all()
    return await Doctor.create(data)
  }

  public async show ({ params }: HttpContextContract) {
    const { id } = params
    return await Doctor.findBy('id', id)
  }

  public async update ({ params, request }: HttpContextContract) {
    const { id } = params
    const data = request.all()
    const doctor = await Doctor.findOrFail(id)

    doctor.merge(data)

    return await doctor.save()
  }

  public async destroy ({ params }: HttpContextContract) {
    const { id } = params
    const doctor = await Doctor.findOrFail(id)

    await doctor.delete()
  }
}
