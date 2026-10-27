import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import type { Request } from "express";

type CookieRequest = Request & { cookies?: Record<string, string> };

function allowedOrigins() {
  return new Set(
    [
      process.env.FRONTEND_URL,
      "http://localhost:3001",
      "http://127.0.0.1:3001",
    ].filter(Boolean),
  );
}

@Injectable()
export class CsrfGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<CookieRequest>();
    const origin = request.headers.origin ?? this.originFromReferer(request);
    if (!origin || !allowedOrigins().has(origin)) {
      throw new ForbiddenException("Invalid request origin");
    }

    const cookieToken = request.cookies?.csrf_token;
    const headerToken = request.header("x-csrf-token");
    if (!cookieToken || !headerToken || cookieToken !== headerToken) {
      throw new ForbiddenException("Invalid CSRF token");
    }
    return true;
  }

  private originFromReferer(request: Request) {
    const referer = request.headers.referer;
    if (!referer) return undefined;
    try {
      return new URL(referer).origin;
    } catch {
      return undefined;
    }
  }
}
