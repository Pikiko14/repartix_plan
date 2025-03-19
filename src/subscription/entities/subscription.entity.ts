import { PeriodEnum } from "../dto/create-subscription.dto";
import { UsabilitiesEntity } from "src/plans/entities/plan.entity";

export class SubscriptionEntity {
  _id?: string;
  plan_id: string;
  user: UserSubscription;
  date_start: Date;
  date_end: Date;
  period: PeriodEnum
  usabilities: UsabilitiesEntity[];
  is_active?: boolean;
}

export class UserSubscription {
  _id: string;
  username: string;
  email: string;
  phone?: string;
  fullname?: string;
}
