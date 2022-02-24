import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDTO {
  id: string;
  @IsEmail()
  @IsNotEmpty({
    message: 'The email should not be empty',
  })
  email: string;

  @IsNotEmpty({
    message: 'The name should not be empty',
  })
  name: string;

  @IsNotEmpty({
    message: 'The password should not be empty',
  })
  @MinLength(8)
  password: string;

  @IsNotEmpty({
    message: 'The Role id should not be empty',
  })
  role_id: number;
}
