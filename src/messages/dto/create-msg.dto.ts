import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateMsgDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  sender: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  recipient: string;

  @IsBoolean()
  @IsOptional()
  isFavourite?: boolean;
}
