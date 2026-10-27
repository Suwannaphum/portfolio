import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { AuthController } from "./auth/auth.controller.js";
import { AuthGuard } from "./auth/auth.guard.js";
import { AuthService } from "./auth/auth.service.js";
import { CsrfGuard } from "./auth/csrf.guard.js";
import { CloudinaryService } from "./media/cloudinary.service.js";
import { MediaController } from "./media/media.controller.js";
import { MediaService } from "./media/media.service.js";
import { PrismaModule } from "./prisma/prisma.module.js";
import { ExperiencesController } from "./portfolio/experiences.controller.js";
import { PortfolioController } from "./portfolio/portfolio.controller.js";
import { PortfolioService } from "./portfolio/portfolio.service.js";
import { ProjectsController } from "./portfolio/projects.controller.js";
import { ResourcesService } from "./portfolio/resources.service.js";
import { SkillsController } from "./portfolio/skills.controller.js";

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [
    AppController,
    AuthController,
    PortfolioController,
    SkillsController,
    ExperiencesController,
    ProjectsController,
    MediaController,
  ],
  providers: [
    AppService,
    AuthService,
    AuthGuard,
    CsrfGuard,
    PortfolioService,
    ResourcesService,
    CloudinaryService,
    MediaService,
  ],
})
export class AppModule {}
