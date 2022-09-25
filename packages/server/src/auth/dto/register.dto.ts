import { IsEmail, IsNotEmpty } from 'class-validator';
import IsValidPassword from 'src/common/decorators/validation/IsValidPassword.decorator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsValidPassword()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
