import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthRateLimitGuard } from './auth-rate-limit.guard.js';
import { AuthService } from './auth.service.js';
import { TelegramAuthDto } from './telegram-auth.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('telegram')
  @UseGuards(AuthRateLimitGuard)
  login(@Body() body: TelegramAuthDto) {
    return this.auth.login(body.initData);
  }
}
