import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module.js';
import { AuthController } from './auth.controller.js';
import { AuthGuard } from './auth.guard.js';
import { AuthRateLimitGuard } from './auth-rate-limit.guard.js';
import { AuthService } from './auth.service.js';

@Module({
  imports: [DbModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, AuthRateLimitGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
