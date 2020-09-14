import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Mail from '@ioc:Adonis/Addons/Mail'

export default class AuthController {
  public async register ({ request }: HttpContextContract) {
    const validationSchema = schema.create({
      name: schema.string({ trim: true }),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email' }),
      ]),
      password: schema.string({ trim: true }),
    })

    const userDetails = await request.validate({
      schema: validationSchema,
      messages: {
        'email.required': 'E-mail is required to register',
        'email.unique': 'E-mail is already in use',
      },
    })

    await User.create(userDetails)

    await Mail.sendLater((message) => {
      message.from('noreply@seujob.com.br')
        .to(userDetails.email)
        .subject('Bem-vindo(a) à Med Agenda')
        .htmlView('emails/welcome', {
          user: { ...userDetails },
        })
    })

    return { message: 'Your account has been created.' }
  }

  public async login ({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const rememberUser = !!request.input('remember_me')
    const token = await auth.use('api').attempt(email, password, rememberUser, {
      expiresIn: '7 days',
    })

    return token.toJSON()
  }
}
