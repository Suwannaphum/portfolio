import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { Request } from "express";
import type { AuthUser } from "./auth.types.js";

type CookieRequest = Request & { cookies?: Record<string, string> };

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<CookieRequest>();
    const token = request.cookies?.session;
    const secret = process.env.JWT_SECRET;
    if (!token || !secret) throw new UnauthorizedException();

    try {
      const payload = this.jwt.verify<{ sub?: string; email?: string }>(token, {
        secret,
      });
      if (!payload.sub || !payload.email) throw new Error("Invalid session");
      (request as CookieRequest & { user: AuthUser }).user = {
        id: payload.sub,
        email: payload.email,
      };
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
