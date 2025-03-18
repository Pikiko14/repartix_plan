import { RpcException } from '@nestjs/microservices';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { PlansRepository } from 'src/plans/repositories/plans.repository';
import { SubscriptionRepository } from './repositories/subscription.repository';
import { DateUtility } from 'src/commons/utils/date.utility';

@Injectable()
export class SubscriptionService {
  constructor(
    @Inject() private readonly dateUtility: DateUtility,
    @Inject() private readonly planRepository: PlansRepository,
    @Inject() private readonly subscriptionRepository: SubscriptionRepository,
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
      // get start date
      createSubscriptionDto.date_start = this.dateUtility.getDate();

      // get end date
      let unit = createSubscriptionDto.period;
      createSubscriptionDto.date_end = this.dateUtility.addDate(
        createSubscriptionDto.date_start,
        unit === 'month' ? 30 : 365,
        unit === 'month' ? 'days' : 'years'
      );

      // set usabilities
      createSubscriptionDto.usabilities = plan.usabilities;

      // create plan
      const subscription = await this.subscriptionRepository.create(createSubscriptionDto);

      // return plan
      return {
        success: true,
        data: subscription,
        message: 'Subscription created success',
      };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
