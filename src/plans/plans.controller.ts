import { Controller } from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PaginationDto } from 'src/commons/dto/pagination.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @MessagePattern({ cmd: 'createPlan' })
  create(@Payload() createPlanDto: CreatePlanDto) {
    return this.plansService.create(createPlanDto);
  }

  @MessagePattern({ cmd: 'findAllPlans' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.plansService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: 'updatePlan' })
  update(@Payload() updatePlanDto: UpdatePlanDto) {
    return this.plansService.update(updatePlanDto.id, updatePlanDto);
  }

  @MessagePattern({ cmd: 'deletePlan' })
  remove(@Payload() id: string) {
    return this.plansService.remove(id);
  }
}
