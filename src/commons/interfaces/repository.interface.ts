import { PaginationDto } from "../dto/pagination.dto";
import { PaginatorInterface } from "./paginator.interface";
import { PlanEntity } from "src/plans/entities/plan.entity";
import { CreatePlanDto } from "src/plans/dto/create-plan.dto";
import { UpdatePlanDto } from "src/plans/dto/update-plan.dto";

export interface IPlansRepository {
  create(createPlanDto: CreatePlanDto): Promise<PlanEntity | unknown>;
  
  find(params: { key: keyof PlanEntity; value: any }): Promise<PlanEntity | null>;

  findAll(paginationDto: PaginationDto): Promise<PaginatorInterface>;

  deleteOne(id: string): Promise<PlanEntity | null>;

  updateOne(id: string, updatePlanDto: UpdatePlanDto): Promise<PlanEntity>;
}
