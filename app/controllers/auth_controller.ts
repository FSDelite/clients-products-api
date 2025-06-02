import User from '#models/user'
import env from '#start/env'
import { singInUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import { rowExists } from '../../helpers/rowExists.js'
const tokenExpiration = env.get('API_TOKEN_EXPIRES_IN_SECONDS') || 86_400

export default class AuthController {
  async login({ request, response }: HttpContext) {
    const { username, password } = await request.validateUsing(singInUserValidator)

    const userExists = await rowExists('users', { username })

    if (!userExists) {
      return response.notFound({ message: 'User not found' })
    }

    const user = (await User.findBy({ username }))!
    const token = await User.accessTokens.create(user, undefined, {
      name: 'Auth Token',
      expiresIn: tokenExpiration,
    })

    if (!(await user.verifyPassword(password))) {
      return response.unauthorized({ message: 'Invalid credentials' })
    }
    console.log(tokenExpiration)

    return response.ok({
      type: 'bearer',
      token: token.value!.release(),
      expiresIn: token.expiresAt!,
    })
  }
}
