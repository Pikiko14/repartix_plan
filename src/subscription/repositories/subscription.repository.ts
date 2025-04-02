import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RpcException } from '@nestjs/microservices';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Subscription } from '../schemas/subscription.schema';
import { PaginationDto } from 'src/commons/dto/pagination.dto';
import { SubscriptionEntity } from '../entities/subscription.entity';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';
import { UpdateSubscriptionDto } from '../dto/update-subscription.dto';
import { IRepository } from 'src/commons/interfaces/repository.interface';
import { PaginatorInterface } from 'src/commons/interfaces/paginator.interface';

@Injectable()
export class SubscriptionRepository implements IRepository {
  constructor(@InjectModel(Subscription.name) private readonly model: Model<Subscription>) {}

  /**
   * Create one plan
   * @param { CreateSubscriptionDto } createSubscriptionDto
   * @returns { Promise<SubscriptionEntity | unknown> }
   */
  async create(createSubscriptionDto: CreateSubscriptionDto): Promise<SubscriptionEntity> {
    try {
      return (await this.model.create(createSubscriptionDto)) as any;
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
    key: keyof SubscriptionEntity;
    value: any;
  }): Promise<SubscriptionEntity | null> {
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
   * @return { SubscriptionEntity | null }
   */
  async deleteOne(id: string): Promise<SubscriptionEntity | null> {
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
   * @param { UpdateSubscriptionDto } updateSubscriptionDto
   * @return { SubscriptionEntity | null }
   */
  async updateOne(id: string, updateSubscriptionDto: UpdateSubscriptionDto): Promise<SubscriptionEntity | null> {
    try {
      return await this.model.findByIdAndUpdate(id, updateSubscriptionDto, { new: true });
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  /**
   * Get last subscription
   * @param { string } userId
   * return 
   */
  async getLastSubscription(_id: string): Promise<SubscriptionEntity | unknown> {
    try {
      return await this.model.findOne({ 'user._id': _id })
      .sort({ date_start: -1 })
      .exec();
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
