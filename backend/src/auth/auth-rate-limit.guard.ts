import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';

type RequestWithIp = {
  ip?: string;
  socket?: { remoteAddress?: string };
};

@Injectable()
export class AuthRateLimitGuard implements CanActivate {
  private readonly hits = new Map<string, number[]>();

  canActivate(context: ExecutionContext): boolean {
    const limit = Number(process.env.AUTH_RATE_LIMIT ?? 10);
    const request = context.switchToHttp().getRequest<RequestWithIp>();
    const key = request.ip || request.socket?.remoteAddress || 'unknown';
    const now = Date.now();
    const recent = (this.hits.get(key) ?? []).filter((at) => now - at < 60_000);
    if (recent.length >= limit) {
      throw new HttpException('Too many requests', 429);
    }
    recent.push(now);
    this.hits.set(key, recent);
    return true;
  }
}
