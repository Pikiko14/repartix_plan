import { envs } from './configuration';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlansModule } from './plans/plans.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    PlansModule,
    MongooseModule.forRoot(envs.app_env === 'production' ?  envs.atlas_url : envs.db_url,),
    SubscriptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
