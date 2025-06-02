import Client from '#models/client'
import {
  deleteClientValidator,
  storeClientValidator,
  updateClientValidator,
} from '#validators/client'
import type { HttpContext } from '@adonisjs/core/http'
import { rowExists } from '../../helpers/rowExists.js'

export default class ClientsController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = Math.min(request.input('perPage', 10), 100)

    return Client.query().paginate(page, perPage)
  }

  async search({ request, response }: HttpContext) {
    const { id, email } = request.all()
    if (!id && !email) {
      return response.badRequest({ error: 'You must provide id or email to search for an user' })
    }
    const query = Client.query().select(['id', 'name', 'email'])
    if (id) {
      query.where('id', id)
    }
    if (email) {
      query.where('email', email)
    }
    const client = await query.first()

    if (!client) {
      return response.notFound({ error: 'Client not found' })
    }
    return client
  }

  async store({ request, response }: HttpContext) {
    const { name, email } = await request.validateUsing(storeClientValidator)
    const clientExists = await rowExists('clients', { email })
    if (clientExists) {
      return response.conflict({ error: 'The email has already been taken.' })
    }
    const client = await Client.create({ name, email })
    return response.created({
      message: 'Client created successfully',
      client: {
        id: client.id,
        name: client.name,
        email: client.email,
      },
    })
  }

  async update({ request, response }: HttpContext) {
    const { name, email, params } = await request.validateUsing(updateClientValidator)
    const id = params.id
    const clientExists = await rowExists('clients', { email }, { id })

    if (clientExists) {
      return response.conflict({ error: 'Client with this email already exists.' })
    }

    const client = await Client.find(id)
    if (!client) {
      return response.notFound({ error: 'Client not found.' })
    }

    client.merge({ name, email })
    await client.save()
    return response.ok({
      message: 'Client updated successfully',
    })
  }

  async destroy({ request, response }: HttpContext) {
    const { params } = await request.validateUsing(deleteClientValidator)
    const id = params.id
    const client = await Client.find(id)
    if (!client) {
      return response.notFound({ error: 'Client not found.' })
    }
    await client.delete()
    return response.ok({
      message: 'Client deleted successfully',
    })
  }
}
