import { Optional } from '@nestjs/common';

export class UpdateUserDto {
  @Optional()
  password?: string;

  @Optional()
  verificationCode?: string;
}
