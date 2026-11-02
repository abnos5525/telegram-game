import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard.js';
import type { AuthUser } from '../auth/auth.service.js';
import { CurrentUser } from '../auth/current-user.js';
import { UsersService } from './users.service.js';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get(':id')
  getOne(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.users.getForRequester(user, id);
  }
}
