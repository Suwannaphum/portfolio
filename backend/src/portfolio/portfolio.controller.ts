import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBody,
  ApiCookieAuth,
  ApiHeader,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard.js";
import { CsrfGuard } from "../auth/csrf.guard.js";
import type { AuthenticatedRequest } from "../auth/auth.types.js";
import { UpdateProfileDto } from "./portfolio.dto.js";
import { PortfolioService } from "./portfolio.service.js";

@Controller("portfolio")
@ApiTags("Portfolio")
export class PortfolioController {
  constructor(private readonly portfolio: PortfolioService) {}

  @Get()
  getPublicPortfolio() {
    return this.portfolio.getPublicPortfolio();
  }

  @Get("admin/profile")
  @UseGuards(AuthGuard)
  @ApiCookieAuth("session")
  getProfile(@Req() request: AuthenticatedRequest) {
    return this.portfolio.getAdminProfile(request.user.id);
  }

  @Patch("admin/profile")
  @UseGuards(AuthGuard, CsrfGuard)
  @ApiCookieAuth("session")
  @ApiHeader({ name: "X-CSRF-Token", required: true })
  @ApiBody({ type: UpdateProfileDto })
  updateProfile(
    @Req() request: AuthenticatedRequest,
    @Body() body: UpdateProfileDto,
  ) {
    return this.portfolio.updateProfile(request.user.id, body);
  }

  @Get("admin/summary")
  @UseGuards(AuthGuard)
  @ApiCookieAuth("session")
  getSummary(@Req() request: AuthenticatedRequest) {
    return this.portfolio.getSummary(request.user.id);
  }
}
