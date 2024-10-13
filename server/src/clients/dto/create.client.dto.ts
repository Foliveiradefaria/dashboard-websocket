import { Type } from 'class-transformer'
import { IsDate, IsString } from 'class-validator'

export class CreateClientDto {
  @IsString()
  name: string

  @IsString()
  gender: string

  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date
}
