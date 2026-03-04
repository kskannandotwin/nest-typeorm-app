import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  refreshToken?: string;
}
