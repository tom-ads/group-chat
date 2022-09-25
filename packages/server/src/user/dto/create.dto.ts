import IsValidPassword from 'src/common/decorators/validation/IsValidPassword.decorator';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsValidPassword()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
