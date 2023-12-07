import { IsString, IsStrongPassword } from 'class-validator';

export class RegisterAuthDto {
  @IsString()
  username: string;

  //@IsStrongPassword({ minUppercase: 0, minSymbols: 0, minNumbers: 0 })
  @IsString()
  password: string;

  @IsString()
  telegramID: string;
}
