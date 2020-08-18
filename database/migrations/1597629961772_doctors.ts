import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Doctors extends BaseSchema {
  protected tableName = 'doctors'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('email').notNullable()
      table.enum('gender', ['F', 'M']).notNullable()
      table.string('phone').notNullable()
      table.string('document').notNullable()
      table.boolean('status').notNullable().defaultTo(true)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
