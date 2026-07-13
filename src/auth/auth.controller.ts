import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/module/user/user.dtoliogn';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.authService.signIn(
      data.email,
      data.password,
    );
  }
}
