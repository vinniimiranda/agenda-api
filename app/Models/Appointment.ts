import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Patient from './Patient'
import Doctor from './Doctor'

export default class Appointment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public doctorId: number

  @belongsTo(() => Doctor)
  public doctor: BelongsTo<typeof Doctor>

  @column()
  public patientId: number

  @belongsTo(() => Patient)
  public patient: BelongsTo<typeof Patient>

  @column.dateTime({ serializeAs: 'startDate' })
  public startDate: DateTime

  @column.dateTime({ serializeAs: 'endDate' })
  public endDate: DateTime

  @column({ serializeAs: 'paymentStatus' })
  public paymentStatus: string

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
