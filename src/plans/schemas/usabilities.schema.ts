import { Models } from '../entities/plan.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UsabilitiesEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  count: number;

  @Prop({ required: true, enum: Models })
  model: Models;

  @Prop({ default: true })
  status: boolean;
}

export const UsabilitiesSchema = SchemaFactory.createForClass(UsabilitiesEntity);
