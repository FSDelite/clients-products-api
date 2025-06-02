import type { HttpContext } from '@adonisjs/core/http'

import Client from '#models/client'

import {
  clientIdValidator,
  storeClientProductFavoriteValidator,
} from '#validators/client_product_favorite'
import { rowExists } from '../../helpers/rowExists.js'
import ProductService from '#services/product_service'
import ClientProductFavorite from '#models/client_product_favorites'

export default class ClientProductFavoritesController {
  async index({ request, response }: HttpContext) {
    const { params } = await request.validateUsing(clientIdValidator)
    const id = params.clientId

    const page = request.input('page', 1)
    const perPage = Math.min(request.input('perPage', 10), 100)

    const client = await Client.query().select('id').where('id', id).first()

    if (!client) {
      return response.notFound({ error: 'Client not found' })
    }

    return client
      ?.related('favoriteProducts')
      .query()
      .select(['id', 'external_id', 'title', 'image_url', 'price', 'average_rating'])
      .paginate(page, perPage)
  }
  async store({ request, response }: HttpContext) {
    const { params, productId } = await request.validateUsing(storeClientProductFavoriteValidator)

    const { clientId } = params

    const client: Client = await rowExists(Client, { id: clientId })
    if (!client) {
      return response.notFound({ error: 'Client not found' })
    }
    const internalProductId = await ProductService.getInternalProductId(productId)

    if (!internalProductId) {
      return response.notFound({ error: 'Product not found in partner API' })
    }

    const favoriteExists = await rowExists(ClientProductFavorite, {
      client_id: clientId,
      product_id: internalProductId,
    })

    if (favoriteExists) {
      return response.conflict({ error: 'Product is already in favorites' })
    }

    await client.related('favoriteProducts').attach([internalProductId])

    return response.created({
      message: 'Product added to favorites successfully',
    })
  }
}
