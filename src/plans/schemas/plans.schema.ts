import { Types } from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { PlanEntity } from '../entities/plan.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UsabilitiesEntity, UsabilitiesSchema } from './usabilities.schema';

export type PlansDocument = HydratedDocument<PlanEntity>;

@Schema({ autoIndex: true })
export class Plan {
  @Prop({ required: true, unique: true, index: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  price_year: number;

  @Prop()
  description: string;

  @Prop({ type: [UsabilitiesSchema], default: [] })
  usabilities: Types.Array<UsabilitiesEntity>;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
