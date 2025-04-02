import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SubscriptionService } from './subscription.service';
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
}
