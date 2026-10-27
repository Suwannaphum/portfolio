import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
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
import {
  CreateExperienceDto,
  ReorderDto,
  UpdateExperienceDto,
} from "./portfolio.dto.js";
import { ResourcesService } from "./resources.service.js";

@Controller("portfolio/admin/experiences")
@UseGuards(AuthGuard)
@ApiTags("Admin Experiences")
@ApiCookieAuth("session")
export class ExperiencesController {
  constructor(private readonly resources: ResourcesService) {}

  @Get()
  list(@Req() request: AuthenticatedRequest) {
    return this.resources.listExperiences(request.user.id);
  }

  @Get(":id")
  get(@Req() request: AuthenticatedRequest, @Param("id") id: string) {
    return this.resources.getExperience(request.user.id, id);
  }

  @Post()
  @UseGuards(CsrfGuard)
  @ApiHeader({ name: "X-CSRF-Token", required: true })
  @ApiBody({ type: CreateExperienceDto })
  create(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateExperienceDto,
  ) {
    return this.resources.createExperience(request.user.id, body);
  }

  @Patch("reorder")
  @UseGuards(CsrfGuard)
  @ApiHeader({ name: "X-CSRF-Token", required: true })
  @ApiBody({ type: ReorderDto })
  reorder(@Req() request: AuthenticatedRequest, @Body() body: ReorderDto) {
    return this.resources.reorderExperiences(request.user.id, body);
  }

  @Patch(":id")
  @UseGuards(CsrfGuard)
  @ApiHeader({ name: "X-CSRF-Token", required: true })
  @ApiBody({ type: UpdateExperienceDto })
  update(
    @Req() request: AuthenticatedRequest,
    @Param("id") id: string,
    @Body() body: UpdateExperienceDto,
  ) {
    return this.resources.updateExperience(request.user.id, id, body);
  }

  @Delete(":id")
  @HttpCode(200)
  @UseGuards(CsrfGuard)
  @ApiHeader({ name: "X-CSRF-Token", required: true })
  remove(@Req() request: AuthenticatedRequest, @Param("id") id: string) {
    return this.resources.deleteExperience(request.user.id, id);
  }
}
