import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserSubscription {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  fullname: string;
}

export const UserSubscriptionSchema = SchemaFactory.createForClass(UserSubscription);
