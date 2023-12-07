import { PartialType } from '@nestjs/swagger';
import { RegisterAuthDto } from './register-auth.dto';

export class LoginAuthDto extends PartialType(RegisterAuthDto) {}
