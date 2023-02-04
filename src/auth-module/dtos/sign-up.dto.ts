import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password should be at least 8 characters long, contain at least one uppercase letter, one number and one special character',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  avatarUrl?: string;
}

export default SignUpDto;
