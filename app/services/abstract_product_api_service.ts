export abstract class AbstractProductApiService {
  protected name: string | undefined

  abstract getName(): string
  abstract getProductById(id: number): Promise<{
    externalId: string
    title: string
    price: number
    averageRating: number
    ratingCount: number
    imageUrl: string
    originService: string
  } | null>
  abstract getConfig(name: string): Promise<any>
}
