import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ApikeyMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const apiKey = ctx.request.header('x-api-key')

    if (!apiKey) {
      return ctx.response.unauthorized({ error: 'API key is required' })
    }

    const apiCredential = env.get('X_API_KEY') === apiKey
    if (!apiCredential) {
      return ctx.response.unauthorized({ error: 'Invalid API key' })
    }

    const output = await next()
    return output
  }
}
