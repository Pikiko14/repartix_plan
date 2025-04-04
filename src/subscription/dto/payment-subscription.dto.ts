import {
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
  } from 'class-validator';
  
  export class PaymentDto {
    @IsMongoId()
    @IsString()
    subscription_id: string;
  
    @IsNotEmpty()
    @IsString()
    payment_status?: string;
  
    @IsOptional()
    @IsString()
    external_id;
  
    @IsOptional()
    date_pay: string;
  
    @IsNumber()
    @IsPositive()
    total: number;

    @IsString()
    @IsOptional()
    paymentMethods?: string;
  }