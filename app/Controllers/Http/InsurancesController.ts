import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import moment from 'moment'
import Insurance from 'App/Models/Insurance'

import Event from '@ioc:Adonis/Core/Event'
import Database from '@ioc:Adonis/Lucid/Database'

Event.on('db:query', Database.prettyPrint)

export default class InsurancesController {
  public async index ({ request }: HttpContextContract) {
    const { name, document, valid_thru } = request.all()
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    if (name) {
      return await Insurance.query().where('name', 'like', `${name}%`).paginate(page, limit)
    }
    if (document) {
      return await Insurance.query().where('document', 'like', `${document}%`).paginate(page, limit)
    }
    if (valid_thru) {
      return await Insurance.query().whereNotBetween('valid_thru',
        [moment().format(), moment(valid_thru).utcOffset(0).subtract(1, 'day').format()])
        .paginate(page, limit)
    }

    return await Insurance.query().paginate(page, limit)
  }

  public async store ({ request }: HttpContextContract) {
    const data = request.all()
    return await Insurance.create(data)
  }

  public async show ({ params }: HttpContextContract) {
    const { id } = params
    return await Insurance.findOrFail(id)
  }

  public async update ({ params, request }: HttpContextContract) {
    const { id } = params
    const data = request.all()

    const insurance = await Insurance.findOrFail(id)

    insurance.merge(data)

    await insurance.save()
  }

  public async destroy ({ params }: HttpContextContract) {
    const { id } = params
    const insurance = await Insurance.findOrFail(id)

    await insurance.delete()
  }
}
