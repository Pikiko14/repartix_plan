import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlansModule } from 'src/plans/plans.module';
import { DateUtility } from 'src/commons/utils/date.utility';
import { SubscriptionService } from './subscription.service';
import { PaymentsModule } from 'src/payments/payments.module';
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
    PaymentsModule,
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, SubscriptionRepository, DateUtility],
})
export class SubscriptionModule {}
