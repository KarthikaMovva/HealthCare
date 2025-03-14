import { IsNotEmpty, IsEmail, IsString, IsNumber, IsOptional, IsEnum, IsMongoId } from 'class-validator';

export class CreateClaimDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  claimAmount: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  documentUrl?: string;

  @IsOptional()
  @IsEnum(['Pending', 'Approved', 'Rejected'])
  status?: string;

  @IsOptional()
  @IsMongoId()
  patientId: string;

  @IsOptional()
  @IsNumber()
  approvedAmount?: number;

  @IsOptional()
  @IsString()
  insurerComments?: string;
}
