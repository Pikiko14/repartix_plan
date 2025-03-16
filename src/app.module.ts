import { envs } from './configuration';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlansModule } from './plans/plans.module';

@Module({
  imports: [
    PlansModule,
    MongooseModule.forRoot(envs.app_env === 'production' ?  envs.atlas_url : envs.db_url,),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
