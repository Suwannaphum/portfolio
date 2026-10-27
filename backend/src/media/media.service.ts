import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { CloudinaryService } from "./cloudinary.service.js";
import { MediaKind, UploadedMediaFile } from "./media.dto.js";

const IMAGE_LIMIT = 10 * 1024 * 1024;
const PDF_LIMIT = 20 * 1024 * 1024;
const imageMimes = new Set(["image/jpeg", "image/png", "image/webp"]);

@Injectable()
export class MediaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async upload(
    userId: string,
    file: UploadedMediaFile | undefined,
    kind: MediaKind,
    projectId?: string,
  ) {
    if (!file) throw new BadRequestException("file is required");
    const isPdf = file.mimetype === "application/pdf";
    if (!isPdf && !imageMimes.has(file.mimetype)) {
      throw new BadRequestException("Unsupported media type");
    }
    if (isPdf && kind !== MediaKind.RESUME) {
      throw new BadRequestException("PDF uploads are only valid for a resume");
    }
    if (!isPdf && kind === MediaKind.RESUME) {
      throw new BadRequestException("Resume uploads must be PDF files");
    }
    if (file.size > (isPdf ? PDF_LIMIT : IMAGE_LIMIT)) {
      throw new BadRequestException(
        isPdf ? "Resume PDF must be 20MB or smaller" : "Image must be 10MB or smaller",
      );
    }

    if (kind === MediaKind.GALLERY && !projectId) {
      throw new BadRequestException("projectId is required for gallery uploads");
    }

    if (projectId) {
      const project = await this.prisma.project.findFirst({
        where: { id: projectId, profile: { ownerId: userId } },
        select: { id: true },
      });
      if (!project) throw new NotFoundException("Project not found");
      if (kind === MediaKind.GALLERY) {
        const count = await this.prisma.projectImage.count({ where: { projectId } });
        if (count >= 10) {
          throw new BadRequestException("A project can have at most 10 gallery images");
        }
      }
    }

    const uploaded = await this.cloudinary.upload(file.buffer, isPdf);
    return {
      data: {
        url: uploaded.secure_url,
        publicId: uploaded.public_id,
        resourceType: uploaded.resource_type,
        format: uploaded.format ?? file.mimetype,
        bytes: uploaded.bytes,
        kind: kind.toLowerCase(),
      },
    };
  }
}
