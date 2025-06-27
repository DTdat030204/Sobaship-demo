import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;



  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string; 
}

export class SigninDto {
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  password: string;
}
