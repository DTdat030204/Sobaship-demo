import { IsString, IsNumber, IsDateString, IsOptional, IsInt, Min} from 'class-validator';

export class CreateAssetDto {
  @IsString()
  name: string;

  // @IsString()
  // code: string;

  @IsString()
  group: string;

  @IsDateString()
  purchaseDate: string;

  @IsNumber()
  price: number;

  // @IsNumber()
  // depreciationValue: number;

  // @IsInt()
  // maintenanceCycleMonths: number;


  
  @IsNumber()
  @Min(1)
  maintenanceIntervalMonths: number;

  @IsDateString()
  @IsOptional()
  lastMaintenanceDate?: string;

  // @IsDateString()
  // @IsOptional()
  // nextMaintenanceDate?: string;

  @IsString()
  status: string;
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

  @IsNumber()
  @IsOptional()
  depreciationValue?: number;

  // @IsInt()
  // @IsOptional()
  // maintenanceCycleMonths?: number;

  @IsDateString()
  @IsOptional()
  lastMaintenanceDate?: string;

  @IsInt()
  @IsOptional()
  maintenanceIntervalMonths?: number;
  // @IsDateString()
  // @IsOptional()
  // nextMaintenanceDate?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
