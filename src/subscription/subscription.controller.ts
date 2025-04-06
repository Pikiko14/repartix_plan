import { Controller } from '@nestjs/common';
import { PaymentDto } from './dto/payment-subscription.dto';
import { SubscriptionService } from './subscription.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @MessagePattern({ cmd: 'createSubscription' })
  create(@Payload() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.create(createSubscriptionDto);
  }

  @MessagePattern('get_user_subscription')
  getSubscriptionByUser(@Payload() id: string) {
    return this.subscriptionService.getSubscriptionByUser(id);
  }

  @MessagePattern('payment_success')
  paymentSuccess(@Payload() paymentDto: PaymentDto) {
    return this.subscriptionService.validateSubscruptionOnPayment(paymentDto);
  }

  @MessagePattern('validate_user_subscription')
  validateUserSubscription(@Payload() id: string) {
    return this.subscriptionService.validateUserSubscription(id);
  }
}
