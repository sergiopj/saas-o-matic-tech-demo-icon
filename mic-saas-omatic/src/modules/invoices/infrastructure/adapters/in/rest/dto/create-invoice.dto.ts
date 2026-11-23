import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  Matches,
  Min,
  Max,
  MaxLength,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreateInvoiceDto {
  @IsString({ message: 'customerId must be a string' })
  @IsNotEmpty({ message: 'customerId is required' })
  @Matches(
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
    { message: 'customerId must be a valid UUID' },
  )
  customerId: string;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' && value.trim() === '' ? undefined : value))
  @Matches(
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
    { message: 'simulationId must be a valid UUID' },
  )
  simulationId?: string;

  @IsString({ message: 'concept must be a string' })
  @IsNotEmpty({ message: 'concept is required' })
  @MaxLength(200, { message: 'concept cannot exceed 200 characters' })
  concept: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'subtotal must be a valid number' })
  @Min(0, { message: 'subtotal must be greater than or equal to 0' })
  subtotal: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'taxRate must be a valid number' })
  @Min(0, { message: 'taxRate cannot be negative' })
  @Max(1, { message: 'taxRate cannot exceed 1.0 (100%)' })
  taxRate?: number;

  @IsOptional()
  @IsString({ message: 'currency must be a string' })
  currency?: string;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' && value.trim() === '' ? undefined : value))
  @IsString({ message: 'notes must be a string' })
  @MaxLength(500, { message: 'notes cannot exceed 500 characters' })
  notes?: string;
}
