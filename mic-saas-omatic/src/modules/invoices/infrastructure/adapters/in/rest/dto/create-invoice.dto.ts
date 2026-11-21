import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsNumber,
  IsOptional,
  Min,
  Max,
  MaxLength,
} from 'class-validator';

export class CreateInvoiceDto {
  @IsUUID('4', { message: 'customerId must be a valid UUID v4' })
  @IsNotEmpty({ message: 'customerId is required' })
  customerId: string;

  @IsOptional()
  @IsUUID('4', { message: 'simulationId must be a valid UUID v4' })
  simulationId?: string;

  @IsString({ message: 'concept must be a string' })
  @IsNotEmpty({ message: 'concept is required' })
  @MaxLength(200, { message: 'concept cannot exceed 200 characters' })
  concept: string;

  @IsNumber({}, { message: 'subtotal must be a valid number' })
  @Min(0, { message: 'subtotal must be greater than or equal to 0' })
  subtotal: number;

  @IsOptional()
  @IsNumber({}, { message: 'taxRate must be a valid number' })
  @Min(0, { message: 'taxRate cannot be negative' })
  @Max(1, { message: 'taxRate cannot exceed 1.0 (100%)' })
  taxRate?: number;

  @IsOptional()
  @IsString({ message: 'currency must be a string' })
  currency?: string;

  @IsOptional()
  @IsString({ message: 'notes must be a string' })
  @MaxLength(500, { message: 'notes cannot exceed 500 characters' })
  notes?: string;
}
