import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlansController } from './plans.controller';
import { Plan, PlanSchema } from './schemas/plans.schema';
import { PlansRepository } from './repositories/plans.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Plan.name,
        schema: PlanSchema,
      }
    ]),
  ],
  controllers: [PlansController],
  providers: [PlansService, PlansRepository],
  exports: [PlansRepository],
})
export class PlansModule {}
