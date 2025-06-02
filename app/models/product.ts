import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare externalId: string

  @column()
  declare price: number

  @column()
  declare imageUrl?: string

  @column()
  declare averageRating?: number

  @column()
  declare ratingCount?: number

  @column()
  declare originService: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
