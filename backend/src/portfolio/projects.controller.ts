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
  CreateProjectDto,
  ReorderDto,
  UpdateProjectDto,
} from "./portfolio.dto.js";
import { ResourcesService } from "./resources.service.js";

@Controller("portfolio/admin/projects")
@UseGuards(AuthGuard)
@ApiTags("Admin Projects")
@ApiCookieAuth("session")
export class ProjectsController {
  constructor(private readonly resources: ResourcesService) {}

  @Get()
  list(@Req() request: AuthenticatedRequest) {
    return this.resources.listProjects(request.user.id);
  }

  @Get(":id")
  get(@Req() request: AuthenticatedRequest, @Param("id") id: string) {
    return this.resources.getProject(request.user.id, id);
  }

  @Post()
  @UseGuards(CsrfGuard)
  @ApiHeader({ name: "X-CSRF-Token", required: true })
  @ApiBody({ type: CreateProjectDto })
  create(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateProjectDto,
  ) {
    return this.resources.createProject(request.user.id, body);
  }

  @Patch("reorder")
  @UseGuards(CsrfGuard)
  @ApiHeader({ name: "X-CSRF-Token", required: true })
  @ApiBody({ type: ReorderDto })
  reorder(@Req() request: AuthenticatedRequest, @Body() body: ReorderDto) {
    return this.resources.reorderProjects(request.user.id, body);
  }

  @Patch(":id")
  @UseGuards(CsrfGuard)
  @ApiHeader({ name: "X-CSRF-Token", required: true })
  @ApiBody({ type: UpdateProjectDto })
  update(
    @Req() request: AuthenticatedRequest,
    @Param("id") id: string,
    @Body() body: UpdateProjectDto,
  ) {
    return this.resources.updateProject(request.user.id, id, body);
  }

  @Delete(":id")
  @HttpCode(200)
  @UseGuards(CsrfGuard)
  @ApiHeader({ name: "X-CSRF-Token", required: true })
  remove(@Req() request: AuthenticatedRequest, @Param("id") id: string) {
    return this.resources.deleteProject(request.user.id, id);
  }
}
