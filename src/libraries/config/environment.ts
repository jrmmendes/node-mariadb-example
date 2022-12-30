import { IsIn, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator'

export class Environment {
  @IsIn(['DEV', 'QA', 'HML', 'PRD', 'TEST'])
  @IsNotEmpty()
  NODE_ENV: 'DEV' | 'QA' |'PRD';

  @IsNumber()
  @IsNotEmpty()
  PORT: number;

  @IsNotEmpty()
  @IsString()
  DB_USER: string;

  @IsNotEmpty()
  @IsString()
  DB_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DB_HOST: string;

  @IsString()
  @IsNotEmpty()
  DB_NAME: string;

  @IsNotEmpty()
  @IsNumber()
  DB_PORT: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  DB_POOL_CONNECTION_LIMIT: number;
}
