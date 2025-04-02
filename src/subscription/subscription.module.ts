import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlansModule } from 'src/plans/plans.module';
import { NatsModule } from 'src/transports/nats.module';
import { DateUtility } from 'src/commons/utils/date.utility';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { Subscription, SubscriptionSchema } from './schemas/subscription.schema';
import { SubscriptionRepository } from './repositories/subscription.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Subscription.name,
        schema: SubscriptionSchema,
      }
    ]),
    PlansModule,
    NatsModule
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, SubscriptionRepository, DateUtility],
})
export class SubscriptionModule {}
