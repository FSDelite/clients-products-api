import User from '#models/user'
import { singUpUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(singUpUserValidator)

    const user = await User.findByOrFail('email', email)
    const token = await User.accessTokens.create(user)

    if (!(await user.verifyPassword(password))) {
      return response.unauthorized({ message: 'Invalid credentials' })
    }

    response.status(200).send({
      type: 'bearer',
      value: token.value!.release(),
    })
  }

  async singup({ request, response }: HttpContext) {
    const { fullName, email, password } = await request.validateUsing(singUpUserValidator)

    const user = await User.create({
      fullName,
      email,
      password,
    })
    const token = await User.accessTokens.create(user)

    response.status(201).send({
      type: 'bearer',
      value: token.value!.release(),
    })
  }
}
