import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiBody, ApiCookieAuth, ApiHeader, ApiTags } from "@nestjs/swagger";
import { randomBytes } from "node:crypto";
import type { Response } from "express";
import { LoginDto } from "./auth.dto.js";
import { AuthGuard } from "./auth.guard.js";
import { AuthService } from "./auth.service.js";
import { CsrfGuard } from "./csrf.guard.js";

const cookieOptions = (httpOnly: boolean) => ({
  httpOnly,
  secure: process.env.COOKIE_SECURE === "true",
  sameSite: "lax" as const,
  path: "/",
});

@Controller("auth")
@ApiTags("Authentication")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(200)
  @ApiBody({ type: LoginDto })
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken } = await this.authService.login(body.email, body.password);
    response.cookie("session", accessToken, {
      ...cookieOptions(true),
      maxAge: 24 * 60 * 60 * 1000,
    });
    return { authenticated: true };
  }

  @Get("csrf")
  getCsrf(@Res({ passthrough: true }) response: Response) {
    const csrfToken = randomBytes(32).toString("hex");
    response.cookie("csrf_token", csrfToken, {
      ...cookieOptions(false),
      maxAge: 24 * 60 * 60 * 1000,
    });
    return { csrfToken };
  }

  @Post("logout")
  @HttpCode(200)
  @UseGuards(AuthGuard, CsrfGuard)
  @ApiCookieAuth("session")
  @ApiHeader({ name: "X-CSRF-Token", required: true })
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie("session", cookieOptions(true));
    return { authenticated: false };
  }
}
