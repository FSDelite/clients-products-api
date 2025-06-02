import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('external_id').notNullable()
      table.decimal('price', 10, 2).notNullable()
      table.string('image_url')
      table.decimal('average_rating', 3, 2).notNullable().defaultTo(0)
      table.integer('rating_count').notNullable().defaultTo(0)
      table.string('origin_service').notNullable()

      table.index(['external_id', 'origin_service'], 'products_external_id_index')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
