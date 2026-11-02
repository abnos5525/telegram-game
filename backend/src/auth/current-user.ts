import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { AuthUser } from './auth.service.js';

export const CurrentUser = createParamDecorator((_: unknown, context: ExecutionContext): AuthUser => {
  return context.switchToHttp().getRequest<{ user: AuthUser }>().user;
});
