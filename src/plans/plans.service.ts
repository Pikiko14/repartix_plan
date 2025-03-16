import { RpcException } from '@nestjs/microservices';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PlansRepository } from './repositories/plans.repository';
import { PaginationDto } from 'src/commons/dto/pagination.dto';

@Injectable()
export class PlansService {
  constructor(
    private readonly repository: PlansRepository,
  ){}

  async create(createPlanDto: CreatePlanDto) {
    // validate isset plan
    const issetPlan = await this.repository.find({ key: 'name', value: createPlanDto.name });
    if (issetPlan)
      throw new RpcException({
        message: `Exist one plan with this name: ${createPlanDto.name}`,
        status: HttpStatus.CONFLICT
      })

    try {
      // create plan
      const plan = await this.repository.create(createPlanDto);

      // return plan
      return plan;
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      // create plan
      const plans = await this.repository.findAll(paginationDto);

      // return plan
      return plans;
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async update(id: string, updatePlanDto: UpdatePlanDto) {
    const issetPlan = await this.repository.find({ key: '_id', value: id });
    if (!issetPlan)
      throw new RpcException({
        message: `Plan with this id don't exist: ${id}`,
        status: HttpStatus.NOT_FOUND,
      });

    try {
      // create plan
      const plan = await this.repository.updateOne(id, updatePlanDto);

      // return plan
      return plan;
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async remove(id: string) {
    const issetPlan = await this.repository.find({ key: '_id', value: id });
    if (!issetPlan)
      throw new RpcException({
        message: `Plan with this id don't exist: ${id}`,
        status: HttpStatus.NOT_FOUND,
      });

    try {
      // create plan
      const plan = await this.repository.deleteOne(id);

      // return plan
      return plan;
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
