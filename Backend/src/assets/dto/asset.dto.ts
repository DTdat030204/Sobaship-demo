import { IsString, IsNumber, IsDateString, IsOptional, IsInt, Min } from 'class-validator';

export class CreateAssetDto {
  @IsString()
  name: string;

  @IsString()
  group: string;

  @IsDateString()
  purchaseDate: string;

  @IsNumber()
  price: number;

  @IsString()
  status: string;

  @IsString()
  @IsOptional()
  maintenanceType?: string; // "auto" / "manual"

  @IsNumber()
  @IsOptional()
  @Min(1)
  maintenanceIntervalMonths?: number;
}

export class UpdateAssetDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  group?: string;

  @IsDateString()
  @IsOptional()
  purchaseDate?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  maintenanceType?: string; // "auto" / "manual"

  @IsNumber()
  @IsOptional()
  @Min(1)
  maintenanceIntervalMonths?: number;
}
