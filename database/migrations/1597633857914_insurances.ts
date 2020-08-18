import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Insurances extends BaseSchema {
  protected tableName = 'insurances'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('document').notNullable()
      table.string('email').notNullable()
      table.string('phone').notNullable()
      table.dateTime('valid_thru').notNullable()
      table.boolean('status').notNullable().defaultTo(true)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
