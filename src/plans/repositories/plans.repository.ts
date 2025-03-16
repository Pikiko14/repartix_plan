import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Plan } from '../schemas/plans.schema';
import { RpcException } from '@nestjs/microservices';
import { PlanEntity } from '../entities/plan.entity';
import { UpdatePlanDto } from '../dto/update-plan.dto';
import { CreatePlanDto } from '../dto/create-plan.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/commons/dto/pagination.dto';
import { IPlansRepository } from 'src/commons/interfaces/repository.interface';
import { PaginatorInterface } from 'src/commons/interfaces/paginator.interface';

@Injectable()
export class PlansRepository implements IPlansRepository {
  constructor(@InjectModel(Plan.name) private readonly model: Model<Plan>) {}

  /**
   * Create one plan
   * @param { CreatePlanDto } createPlanDto
   * @returns { Promise<PlanEntity | unknown> }
   */
  async create(createPlanDto: CreatePlanDto): Promise<PlanEntity> {
    try {
      console.log(createPlanDto);
      return (await this.model.create(createPlanDto)) as any;
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  /**
   * Find plan by key and value
   * @param params
   */
  async find(params: {
    key: keyof PlanEntity;
    value: any;
  }): Promise<PlanEntity | null> {
    try {
      return await this.model.findOne({ [params.key]: params.value });
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  /**
   * List all plans
   * @param { PaginationDto } paginationDto
   * @return { PlanEntity[] }
   */
  async findAll(paginationDto: PaginationDto): Promise<PaginatorInterface> {
    try {
      const { page = 1, per_page = 10 } = paginationDto;
      const skip = (page - 1) * per_page;
  
      // Contar el total de registros
      const totalItems = await this.model.countDocuments();
  
      // Calcular total de páginas
      const totalPages = Math.ceil(totalItems / per_page);
  
      // Obtener los registros paginados
      const plans = await this.model.find().skip(skip).limit(per_page).exec();
  
      return { data: plans, totalPages, totalItems };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  /**
   * Delete one plan
   * @param { string } id
   * @return { PlanEntity | null }
   */
  async deleteOne(id: string): Promise<PlanEntity | null> {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  /**
   * Update one plan
   * @param { string } id
   * @return { PlanEntity | null }
   */
  async updateOne(id: string, updatePlanDto: UpdatePlanDto): Promise<PlanEntity | null> {
    try {
      return await this.model.findByIdAndUpdate(id, updatePlanDto, { new: true });
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
