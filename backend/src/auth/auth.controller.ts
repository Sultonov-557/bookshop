import { Controller, Post, Param, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('register')
  register(@Body() registerAuthDto: RegisterAuthDto) {
    console.log(registerAuthDto);
    
    return this.authService.register(registerAuthDto);
  }

  @Post('verify/:telegramID')
  verify(@Param('telegramID') telegramID) {
    return this.authService.verify(telegramID);
  }
}
