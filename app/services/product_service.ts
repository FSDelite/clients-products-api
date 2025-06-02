import Product from '#models/product'
import { rowExists } from '../../helpers/rowExists.js'
import FakeStoreApiService from './fake_store_api_service.js'

export default class ProductService {
  static getExternalService() {
    // Este método deve retornar a instância do serviço externo responsável por buscar produtos.
    // Por enquanto, sua lógica ainda não foi implementada, então retornamos o FakeStoreApiService.
    // Esta é uma implementação provisória (placeholder).
    return new FakeStoreApiService()
  }
  static async findOrCreateInternalProductId(externalId: number, store = true): Promise<number | null> {
    const OriginService = this.getExternalService()

    const product = await rowExists(Product, {
      external_id: externalId,
      origin_service: OriginService.getName(),
    })

    if (product) return product.id
    if (!store) return null

    return await this.storeExternalProduct(externalId, OriginService)
  }

  static async storeExternalProduct(
    externalId: number,
    OriginService: FakeStoreApiService // posteriormente, isso seria um tipo mais genérico
  ): Promise<number | null> {
    const externalProduct = await OriginService.getProductById(externalId)
    if (!externalProduct) {
      return null
    }

    const newProduct = await Product.create(externalProduct)
    return newProduct.id
  }
}
