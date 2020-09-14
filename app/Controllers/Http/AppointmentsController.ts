import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Appointment from 'App/Models/Appointment'

export default class AppointmentsController {
  public async index ({ request }: HttpContextContract) {
    const { name, document, status } = request.all()
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    if (name) {
      return await Appointment.query().where('name', 'like', `${name}%`).paginate(page, limit)
    }
    if (document) {
      return await Appointment.query().where('document', 'like', `${document}%`).paginate(page, limit)
    }
    if (status) {
      return await Appointment.query().where('status', status).paginate(page, limit)
    }
    return await Appointment.query().preload('doctor').preload('patient').paginate(page, limit)
  }

  public async store ({ request }: HttpContextContract) {
    const data = request.all()
    return await Appointment.create(data)
  }

  public async show ({ params }: HttpContextContract) {
    const { id } = params
    return await Appointment.findBy('id', id)
  }

  public async update ({ params, request }: HttpContextContract) {
    const { id } = params
    const data = request.all()
    const appointment = await Appointment.findOrFail(id)

    appointment.merge(data)

    return await appointment.save()
  }

  public async destroy ({ params }: HttpContextContract) {
    const { id } = params
    const appointment = await Appointment.findOrFail(id)

    await appointment.delete()
  }
}
