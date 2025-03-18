import { Types } from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { PeriodEnum } from '../dto/create-subscription.dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SubscriptionEntity } from '../entities/subscription.entity';
import { UserSubscription, UserSubscriptionSchema } from './user-subscription.schema';
import { UsabilitiesEntity, UsabilitiesSchema } from '../../plans/schemas/usabilities.schema';

export type SubscriptionDocument = HydratedDocument<SubscriptionEntity>;

@Schema({ autoIndex: true })
export class Subscription {
  @Prop({ required: true, index: true })
  plan_id: string;

  @Prop({ required: true })
  date_start: Date;

  @Prop({ required: true })
  date_end: Date;

  @Prop({ default: false })
  is_active: boolean;

  @Prop()
  period: PeriodEnum;

  @Prop({ type: [UsabilitiesSchema], default: [] })
  usabilities: Types.Array<UsabilitiesEntity>;
  
  @Prop({ type: UserSubscriptionSchema, default: {} })
  user: UserSubscription;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
