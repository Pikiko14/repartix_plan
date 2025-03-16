import { Models } from '../entities/plan.entity';
import { IsString, IsInt, IsEnum, IsBoolean } from 'class-validator';

export class UsabilitiesDto {
  @IsString()
  name: string;

  @IsInt()
  count: number;

  @IsEnum(Models)
  model: Models;

  @IsBoolean()
  status: boolean;
}
