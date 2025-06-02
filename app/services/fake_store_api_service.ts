import env from '#start/env'
import { FakeStoreApiProduct } from '../@types/fakeStoreApi.js'
import { AbstractProductApiService } from './abstract_product_api_service.js'
import { HttpService } from './http_service.js'

export default class FakeStoreApiService extends AbstractProductApiService {
  protected name = 'fake_store_api'

  getName() {
    return this.name
  }
  async getProductById(id: number): Promise<{
    externalId: string
    title: string
    price: number
    averageRating: number
    ratingCount: number
    imageUrl: string
    originService: string
  } | null> {
    const { baseUrl } = await this.getConfig(this.name)

    try {
      const product = await HttpService.get<FakeStoreApiProduct>(`${baseUrl}/products/${id}`)
      return {
        externalId: product.id.toString(),
        title: product.title,
        price: product.price,
        averageRating: product.rating?.rate,
        ratingCount: product.rating?.count,
        imageUrl: product.image,
        originService: this.getName(),
      }
    } catch (error) {
      console.error(`Error fetching product with ID ${id} from ${this.name}:`, error)
      return null
    }
  }

  async getConfig(name: string): Promise<any> {
    // Em produção, isso viria do banco de dados para escalar
    return {
      baseUrl: env.get('FAKESTORE_BASE_URL'),
      name: name,
    }
  }
}
