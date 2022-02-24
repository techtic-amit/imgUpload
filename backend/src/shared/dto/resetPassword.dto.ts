import { IsNotEmpty, MinLength } from 'class-validator';

export class ResetPasswordDTO {
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
