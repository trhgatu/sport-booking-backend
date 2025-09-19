import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { QueryPaginationDto } from '@shared/dtos';

export class QuerySportDto extends QueryPaginationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}
