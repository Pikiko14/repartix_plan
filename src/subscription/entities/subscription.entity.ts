import { UsabilitiesEntity } from "src/plans/entities/plan.entity";

export class SubscriptionEntity {
  plan_id: string;
  user: UserSubscription;
  date_start: Date;
  date_end: Date;
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
