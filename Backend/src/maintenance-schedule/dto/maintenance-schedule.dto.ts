import { IsString, IsNumber, IsDateString, IsOptional, IsInt, Min } from 'class-validator';

export class CreateAutoMaintenanceDto {
  @IsInt()
  assetId: number;

  @IsInt()
  @Min(1)
  maintenanceIntervalMonths: number;

  @IsDateString()
  maintenanceDate: string;

  @IsString()
  @IsOptional()
  note?: string;
}

export class CreateManualMaintenanceDto {
  @IsInt()
  assetId: number;

  @IsDateString()
  maintenanceDate: string;

  @IsString()
  @IsOptional()
  note?: string;
}


export class ConfirmMaintenanceDto {
  @IsNumber()
  @Min(0)
  cost: number;
}