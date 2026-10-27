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
  CreateSkillDto,
  ReorderDto,
  UpdateSkillDto,
} from "./portfolio.dto.js";
import { ResourcesService } from "./resources.service.js";

@Controller("portfolio/admin/skills")
@UseGuards(AuthGuard)
@ApiTags("Admin Skills")
@ApiCookieAuth("session")
export class SkillsController {
  constructor(private readonly resources: ResourcesService) {}

  @Get()
  list(@Req() request: AuthenticatedRequest) {
    return this.resources.listSkills(request.user.id);
  }

  @Get(":id")
  get(@Req() request: AuthenticatedRequest, @Param("id") id: string) {
    return this.resources.getSkill(request.user.id, id);
  }

  @Post()
  @UseGuards(CsrfGuard)
  @ApiHeader({ name: "X-CSRF-Token", required: true })
  @ApiBody({ type: CreateSkillDto })
  create(@Req() request: AuthenticatedRequest, @Body() body: CreateSkillDto) {
    return this.resources.createSkill(request.user.id, body);
  }

  @Patch("reorder")
  @UseGuards(CsrfGuard)
  @ApiHeader({ name: "X-CSRF-Token", required: true })
  @ApiBody({ type: ReorderDto })
  reorder(@Req() request: AuthenticatedRequest, @Body() body: ReorderDto) {
    return this.resources.reorderSkills(request.user.id, body);
  }

  @Patch(":id")
  @UseGuards(CsrfGuard)
  @ApiHeader({ name: "X-CSRF-Token", required: true })
  @ApiBody({ type: UpdateSkillDto })
  update(
    @Req() request: AuthenticatedRequest,
    @Param("id") id: string,
    @Body() body: UpdateSkillDto,
  ) {
    return this.resources.updateSkill(request.user.id, id, body);
  }

  @Delete(":id")
  @HttpCode(200)
  @UseGuards(CsrfGuard)
  @ApiHeader({ name: "X-CSRF-Token", required: true })
  remove(@Req() request: AuthenticatedRequest, @Param("id") id: string) {
    return this.resources.deleteSkill(request.user.id, id);
  }
}
