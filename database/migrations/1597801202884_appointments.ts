import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Appointments extends BaseSchema {
  protected tableName = 'appointments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 120).notNullable()
      table.string('description', 255).notNullable()
      table.dateTime('start_date').notNullable()
      table.dateTime('end_date').notNullable()
      table.integer('patient_id').unsigned().references('id').inTable('patients').onDelete('SET NULL')
      table.integer('doctor_id').unsigned().references('id').inTable('doctors').onDelete('SET NULL')
      table.enum('payment_status', ['Pending', 'Processing', 'Finished', 'Canceled']).defaultTo('Pending')
      table.boolean('status').notNullable().defaultTo(true)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
