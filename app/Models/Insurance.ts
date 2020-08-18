import { DateTime, DateObject } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Insurance extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public document: string

  @column()
  public email: string

  @column()
  public phone: string

  @column()
  public status: boolean

  @column({ columnName: 'valid_thru' })
  public validThru: DateObject

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
