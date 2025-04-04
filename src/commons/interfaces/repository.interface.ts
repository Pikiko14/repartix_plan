import { PaginationDto } from '../dto/pagination.dto';
import { PaginatorInterface } from './paginator.interface';
import { PlanEntity } from 'src/plans/entities/plan.entity';
import { CreatePlanDto } from 'src/plans/dto/create-plan.dto';
import { UpdatePlanDto } from 'src/plans/dto/update-plan.dto';
import { SubscriptionEntity } from 'src/subscription/entities/subscription.entity';
import { CreateSubscriptionDto } from 'src/subscription/dto/create-subscription.dto';
import { UpdateSubscriptionDto } from 'src/subscription/dto/update-subscription.dto';

export interface IRepository {
  create(
    createPlanDto: CreatePlanDto | CreateSubscriptionDto,
  ): Promise<PlanEntity | SubscriptionEntity | unknown>;

  find(params: {
    key: keyof PlanEntity | keyof SubscriptionEntity;
    value: any;
  }): Promise<PlanEntity | SubscriptionEntity | null>;

  findAll(paginationDto: PaginationDto): Promise<PaginatorInterface>;

  findByQuery?(query: any): Promise<SubscriptionEntity | unknown>;

  deleteOne(id: string): Promise<PlanEntity | SubscriptionEntity | null>;

  updateOne(
    id: string,
    updatePlanDto: UpdatePlanDto | SubscriptionEntity,
  ): Promise<PlanEntity | SubscriptionEntity>;
}
