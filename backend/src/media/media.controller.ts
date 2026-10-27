import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiHeader,
  ApiTags,
} from "@nestjs/swagger";
import type { AuthenticatedRequest } from "../auth/auth.types.js";
import { AuthGuard } from "../auth/auth.guard.js";
import { CsrfGuard } from "../auth/csrf.guard.js";
import { MediaService } from "./media.service.js";
import { UploadMediaDto, UploadedMediaFile } from "./media.dto.js";

@Controller("media")
@ApiTags("Media")
export class MediaController {
  constructor(private readonly media: MediaService) {}

  @Post("upload")
  @UseGuards(AuthGuard, CsrfGuard)
  @UseInterceptors(
    FileInterceptor("file", { limits: { fileSize: 20 * 1024 * 1024 } }),
  )
  @ApiCookieAuth("session")
  @ApiHeader({ name: "X-CSRF-Token", required: true })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      required: ["file"],
      properties: {
        file: { type: "string", format: "binary" },
        kind: { type: "string", enum: ["AVATAR", "RESUME", "COVER", "GALLERY"] },
        projectId: { type: "string" },
      },
    },
  })
  upload(
    @Req() request: AuthenticatedRequest,
    @UploadedFile() file: UploadedMediaFile | undefined,
    @Body() body: UploadMediaDto,
  ) {
    return this.media.upload(request.user.id, file, body.kind, body.projectId);
  }
}
