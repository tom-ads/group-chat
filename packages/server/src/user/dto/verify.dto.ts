import { Length } from 'class-validator';

export class VerifyDto {
  @Length(6, 6)
  code: string;
}
