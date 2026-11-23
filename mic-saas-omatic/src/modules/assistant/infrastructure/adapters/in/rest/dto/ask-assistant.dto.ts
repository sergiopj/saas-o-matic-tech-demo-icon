import { IsIn, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class AskAssistantDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(500)
  query: string;

  @IsOptional()
  @IsString()
  @IsIn(['es', 'en', 'fr'])
  language?: string;
}
