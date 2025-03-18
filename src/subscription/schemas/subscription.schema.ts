import { Types } from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SubscriptionEntity } from '../entities/subscription.entity';
import { UsabilitiesEntity, UsabilitiesSchema } from '../../plans/schemas/usabilities.schema';
import { UserSubscription, UserSubscriptionSchema } from './user-subscription.schema';

export type SubscriptionDocument = HydratedDocument<SubscriptionEntity>;

@Schema({ autoIndex: true })
export class Subscription {
  @Prop({ required: true, index: true })
  plan_id: string;

  @Prop({ required: true })
  date_start: Date;

  @Prop({ required: true })
  date_end: number;

  @Prop()
  is_active: string;

  @Prop({ type: [UsabilitiesSchema], default: [] })
  usabilities: Types.Array<UsabilitiesEntity>;
  
  @Prop({ type: UserSubscriptionSchema, default: {} })
  user: UserSubscription;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
