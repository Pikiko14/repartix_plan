import { RpcException } from '@nestjs/microservices';
import { DateUtility } from 'src/commons/utils/date.utility';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { PlansRepository } from 'src/plans/repositories/plans.repository';
import { SubscriptionRepository } from './repositories/subscription.repository';

@Injectable()
export class SubscriptionService {
  constructor(
    @Inject() private readonly dateUtility: DateUtility,
    @Inject() private readonly planRepository: PlansRepository,
    @Inject() private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    // validate isset plan
    const plan = await this.planRepository.find({
      key: '_id',
      value: createSubscriptionDto.plan_id,
    });
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
        unit === 'month' ? 'days' : 'years',
      );

      // set usabilities
      createSubscriptionDto.usabilities = plan.usabilities;

      // create subscription
      const subscription = await this.subscriptionRepository.create(
        createSubscriptionDto,
      );

      // generate payment instance
      //const paymentDto: CreatePaymentDto = {
      //  date_pay: createSubscriptionDto.date_start,
      //  external_id: null,
      //  total: unit === 'month' ? plan.price : plan.price_year,
      //  subscription_id: subscription._id,
      //  user: {
      //    _id: subscription?.user?._id || '',
      //    email: subscription?.user?.email || '',
      //    phone: subscription?.user?.phone || '',
      //    fullname: subscription?.user?.fullname || '',
      //    username: subscription?.user?.username || '',
      //  },
      //  paymentMethods:
      //    createSubscriptionDto.paymentMethods === 'mercadopago'
      //      ? PaymentMethods.mercadopago
      //      : null,
      //};
      //const paymentInstance = await this.paymentServices.create(paymentDto);

      // return plan
      return {
        success: true,
        data: {
          subscription,
          //paymentInstance,
        },
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
