import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Product from '#models/product'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare email: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Product, {
    pivotTable: 'client_product_favorites',
    localKey: 'id',
    pivotForeignKey: 'client_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'product_id',
    pivotTimestamps: true,
  })
  declare favoriteProducts: ManyToMany<typeof Product>
}
