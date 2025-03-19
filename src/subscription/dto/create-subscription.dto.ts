import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserSubscriptionDto } from './user-subscription.dto';
import { UsabilitiesDto } from 'src/plans/dto/usabilities.dto';

export enum PeriodEnum {
  month = 'month',
  yeat = 'year',
}

export class CreateSubscriptionDto {
  @IsMongoId()
  @IsNotEmpty()
  plan_id: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => UserSubscriptionDto)
  user: UserSubscriptionDto[];

  @IsNotEmpty()
  @IsEnum(PeriodEnum)
  period: PeriodEnum;

  @IsOptional()
  date_start: string;

  @IsOptional()
  date_end: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UsabilitiesDto)
  usabilities: UsabilitiesDto[];

  @IsOptional()
  paymentMethods?: string;
}
