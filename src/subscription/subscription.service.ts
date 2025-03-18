import { RpcException } from '@nestjs/microservices';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { PlansRepository } from 'src/plans/repositories/plans.repository';

@Injectable()
export class SubscriptionService {
  constructor(
    @Inject() private readonly planRepository: PlansRepository,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    // validate isset plan
    const plan = await this.planRepository.find({ key: '_id', value: createSubscriptionDto.plan_id });
    if (!plan)
      throw new RpcException({
        message: `Don't exists one plan with this id: ${createSubscriptionDto.plan_id}`,
        status: HttpStatus.NOT_FOUND,
      });

    try {
      // create plan
      const subscription = createSubscriptionDto;

      // return plan
      return subscription;
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
