import { UserDto } from './user/user-dto';
import { Controller, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/register')
  async register(@Body() body: UserDto){ 
    return this.authService.register(body)
  }
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() body) { 
      return this.authService.login(body);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Body() body) {
  //   return body.mail;
  // }
}
