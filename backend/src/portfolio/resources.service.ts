import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ProjectStatus } from "../generated/prisma/enums.js";
import { PrismaService } from "../prisma/prisma.service.js";
import {
  CreateExperienceDto,
  CreateProjectDto,
  CreateSkillDto,
  ReorderDto,
  UpdateExperienceDto,
  UpdateProjectDto,
  UpdateSkillDto,
} from "./portfolio.dto.js";
import { mapExperience, mapProject, mapSkill } from "./portfolio.mapper.js";

const dateValue = (value: string) => new Date(`${value.slice(0, 10)}T00:00:00.000Z`);

function assertDateRange(start: Date, end: Date | null) {
  if (end && end < start) {
    throw new BadRequestException("endDate must be on or after startDate");
  }
}

function isUniqueViolation(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2002"
  );
}

@Injectable()
export class ResourcesService {
  constructor(private readonly prisma: PrismaService) {}

  private async profileIdForOwner(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { ownerId: userId },
      select: { id: true },
    });
    if (!profile) throw new NotFoundException("Portfolio profile not found");
    return profile.id;
  }

  private async skillForOwner(userId: string, id: string) {
    const profileId = await this.profileIdForOwner(userId);
    const skill = await this.prisma.skill.findFirst({ where: { id, profileId } });
    if (!skill) throw new NotFoundException("Skill not found");
    return skill;
  }

  async listSkills(userId: string) {
    const profileId = await this.profileIdForOwner(userId);
    const [skills, total] = await Promise.all([
      this.prisma.skill.findMany({
        where: { profileId },
        orderBy: { sortOrder: "asc" },
      }),
      this.prisma.skill.count({ where: { profileId } }),
    ]);
    return { data: skills.map(mapSkill), total };
  }

  async getSkill(userId: string, id: string) {
    return { data: mapSkill(await this.skillForOwner(userId, id)) };
  }

  private async assertUniqueSkill(profileId: string, name: string, id?: string) {
    const duplicate = await this.prisma.skill.findFirst({
      where: {
        profileId,
        name: { equals: name, mode: "insensitive" },
        ...(id ? { NOT: { id } } : {}),
      },
    });
    if (duplicate) throw new ConflictException("Skill name already exists");
  }

  async createSkill(userId: string, dto: CreateSkillDto) {
    const profileId = await this.profileIdForOwner(userId);
    await this.assertUniqueSkill(profileId, dto.name);
    try {
      const skill = await this.prisma.skill.create({
        data: {
          profileId,
          name: dto.name,
          category: dto.category ?? null,
          sortOrder: dto.sortOrder ?? 0,
        },
      });
      return { data: mapSkill(skill) };
    } catch (error) {
      if (isUniqueViolation(error)) throw new ConflictException("Skill already exists");
      throw error;
    }
  }

  async updateSkill(userId: string, id: string, dto: UpdateSkillDto) {
    const skill = await this.skillForOwner(userId, id);
    if (dto.name !== undefined) await this.assertUniqueSkill(skill.profileId, dto.name, id);
    const updated = await this.prisma.skill.update({
      where: { id: skill.id },
      data: {
        ...(dto.name !== undefined ? { name: dto.name } : {}),
        ...(dto.category !== undefined ? { category: dto.category } : {}),
        ...(dto.sortOrder !== undefined ? { sortOrder: dto.sortOrder } : {}),
      },
    });
    return { data: mapSkill(updated) };
  }

  async deleteSkill(userId: string, id: string) {
    const skill = await this.skillForOwner(userId, id);
    await this.prisma.skill.delete({ where: { id: skill.id } });
    return { deleted: true };
  }

  async reorderSkills(userId: string, dto: ReorderDto) {
    const profileId = await this.profileIdForOwner(userId);
    await this.assertReorderItems(
      dto,
      await this.prisma.skill.findMany({
        where: { profileId, id: { in: dto.items.map((item) => item.id) } },
        select: { id: true },
      }),
    );
    await this.prisma.$transaction(
      dto.items.map((item) =>
        this.prisma.skill.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        }),
      ),
    );
    return this.listSkills(userId);
  }

  private async experienceForOwner(userId: string, id: string) {
    const profileId = await this.profileIdForOwner(userId);
    const experience = await this.prisma.experience.findFirst({
      where: { id, profileId },
    });
    if (!experience) throw new NotFoundException("Experience not found");
    return experience;
  }

  async listExperiences(userId: string) {
    const profileId = await this.profileIdForOwner(userId);
    const [experiences, total] = await Promise.all([
      this.prisma.experience.findMany({
        where: { profileId },
        orderBy: { sortOrder: "asc" },
      }),
      this.prisma.experience.count({ where: { profileId } }),
    ]);
    return { data: experiences.map(mapExperience), total };
  }

  async getExperience(userId: string, id: string) {
    return { data: mapExperience(await this.experienceForOwner(userId, id)) };
  }

  async createExperience(userId: string, dto: CreateExperienceDto) {
    const profileId = await this.profileIdForOwner(userId);
    const startDate = dateValue(dto.startDate);
    const endDate = dto.endDate ? dateValue(dto.endDate) : null;
    assertDateRange(startDate, endDate);
    const experience = await this.prisma.experience.create({
      data: {
        profileId,
        title: dto.title,
        organization: dto.organization,
        type: dto.type ?? null,
        startDate,
        endDate,
        summary: dto.summary ?? null,
        highlights: dto.highlights ?? [],
        sortOrder: dto.sortOrder ?? 0,
      },
    });
    return { data: mapExperience(experience) };
  }

  async updateExperience(userId: string, id: string, dto: UpdateExperienceDto) {
    const experience = await this.experienceForOwner(userId, id);
    const startDate = dto.startDate ? dateValue(dto.startDate) : experience.startDate;
    const endDate = dto.endDate === null
      ? null
      : dto.endDate
        ? dateValue(dto.endDate)
        : experience.endDate;
    assertDateRange(startDate, endDate);
    const updated = await this.prisma.experience.update({
      where: { id: experience.id },
      data: {
        ...(dto.title !== undefined ? { title: dto.title } : {}),
        ...(dto.organization !== undefined ? { organization: dto.organization } : {}),
        ...(dto.type !== undefined ? { type: dto.type } : {}),
        ...(dto.startDate !== undefined ? { startDate } : {}),
        ...(dto.endDate !== undefined ? { endDate } : {}),
        ...(dto.summary !== undefined ? { summary: dto.summary } : {}),
        ...(dto.highlights !== undefined ? { highlights: dto.highlights } : {}),
        ...(dto.sortOrder !== undefined ? { sortOrder: dto.sortOrder } : {}),
      },
    });
    return { data: mapExperience(updated) };
  }

  async deleteExperience(userId: string, id: string) {
    const experience = await this.experienceForOwner(userId, id);
    await this.prisma.experience.delete({ where: { id: experience.id } });
    return { deleted: true };
  }

  async reorderExperiences(userId: string, dto: ReorderDto) {
    const profileId = await this.profileIdForOwner(userId);
    await this.assertReorderItems(
      dto,
      await this.prisma.experience.findMany({
        where: { profileId, id: { in: dto.items.map((item) => item.id) } },
        select: { id: true },
      }),
    );
    await this.prisma.$transaction(
      dto.items.map((item) =>
        this.prisma.experience.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        }),
      ),
    );
    return this.listExperiences(userId);
  }

  private async projectForOwner(userId: string, id: string) {
    const profileId = await this.profileIdForOwner(userId);
    const project = await this.prisma.project.findFirst({
      where: { id, profileId },
      include: { gallery: { orderBy: { sortOrder: "asc" } } },
    });
    if (!project) throw new NotFoundException("Project not found");
    return project;
  }

  async listProjects(userId: string) {
    const profileId = await this.profileIdForOwner(userId);
    const [projects, total] = await Promise.all([
      this.prisma.project.findMany({
        where: { profileId },
        orderBy: { sortOrder: "asc" },
        include: { gallery: { orderBy: { sortOrder: "asc" } } },
      }),
      this.prisma.project.count({ where: { profileId } }),
    ]);
    return { data: projects.map((project) => mapProject(project, true)), total };
  }

  async getProject(userId: string, id: string) {
    return { data: mapProject(await this.projectForOwner(userId, id), true) };
  }

  private validateProjectMedia(
    coverImageUrl: string | null | undefined,
    coverImageAlt: string | null | undefined,
    gallery: CreateProjectDto["gallery"],
  ) {
    if (coverImageUrl && !coverImageAlt?.trim()) {
      throw new BadRequestException("coverImageAlt is required with coverImageUrl");
    }
    if (gallery && gallery.length > 10) {
      throw new BadRequestException("A project can have at most 10 gallery images");
    }
  }

  private galleryCreate(gallery: CreateProjectDto["gallery"]) {
    return gallery?.map(({ id: _id, ...image }, index) => ({
      ...image,
      sortOrder: image.sortOrder ?? index + 1,
    }));
  }

  async createProject(userId: string, dto: CreateProjectDto) {
    const profileId = await this.profileIdForOwner(userId);
    this.validateProjectMedia(dto.coverImageUrl, dto.coverImageAlt, dto.gallery);
    try {
      const project = await this.prisma.project.create({
        data: {
          profileId,
          title: dto.title,
          slug: dto.slug,
          description: dto.description,
          techStack: dto.techStack ?? [],
          coverImageUrl: dto.coverImageUrl ?? null,
          coverImageAlt: dto.coverImageAlt ?? null,
          coverCloudinaryId: dto.coverCloudinaryId ?? null,
          projectUrl: dto.projectUrl ?? null,
          sourceUrl: dto.sourceUrl ?? null,
          status: dto.status ?? ProjectStatus.DRAFT,
          sortOrder: dto.sortOrder ?? 0,
          ...(dto.gallery !== undefined
            ? { gallery: { create: this.galleryCreate(dto.gallery) } }
            : {}),
        },
        include: { gallery: { orderBy: { sortOrder: "asc" } } },
      });
      return { data: mapProject(project, true) };
    } catch (error) {
      if (isUniqueViolation(error)) throw new ConflictException("Project slug already exists");
      throw error;
    }
  }

  async updateProject(userId: string, id: string, dto: UpdateProjectDto) {
    const project = await this.projectForOwner(userId, id);
    const coverImageUrl = dto.coverImageUrl !== undefined
      ? dto.coverImageUrl
      : project.coverImageUrl;
    const coverImageAlt = dto.coverImageAlt !== undefined
      ? dto.coverImageAlt
      : project.coverImageAlt;
    this.validateProjectMedia(coverImageUrl, coverImageAlt, dto.gallery);
    try {
      const updated = await this.prisma.project.update({
        where: { id: project.id },
        data: {
          ...(dto.title !== undefined ? { title: dto.title } : {}),
          ...(dto.slug !== undefined ? { slug: dto.slug } : {}),
          ...(dto.description !== undefined ? { description: dto.description } : {}),
          ...(dto.techStack !== undefined ? { techStack: dto.techStack } : {}),
          ...(dto.coverImageUrl !== undefined ? { coverImageUrl: dto.coverImageUrl } : {}),
          ...(dto.coverImageAlt !== undefined ? { coverImageAlt: dto.coverImageAlt } : {}),
          ...(dto.coverCloudinaryId !== undefined ? { coverCloudinaryId: dto.coverCloudinaryId } : {}),
          ...(dto.projectUrl !== undefined ? { projectUrl: dto.projectUrl } : {}),
          ...(dto.sourceUrl !== undefined ? { sourceUrl: dto.sourceUrl } : {}),
          ...(dto.status !== undefined ? { status: dto.status } : {}),
          ...(dto.sortOrder !== undefined ? { sortOrder: dto.sortOrder } : {}),
          ...(dto.coverImageUrl === null ? { coverImageAlt: null, coverCloudinaryId: null } : {}),
          ...(dto.gallery !== undefined
            ? {
                gallery: {
                  deleteMany: {},
                  create: this.galleryCreate(dto.gallery),
                },
              }
            : {}),
        },
        include: { gallery: { orderBy: { sortOrder: "asc" } } },
      });
      return { data: mapProject(updated, true) };
    } catch (error) {
      if (isUniqueViolation(error)) throw new ConflictException("Project slug already exists");
      throw error;
    }
  }

  async deleteProject(userId: string, id: string) {
    const project = await this.projectForOwner(userId, id);
    await this.prisma.project.delete({ where: { id: project.id } });
    return { deleted: true };
  }

  async reorderProjects(userId: string, dto: ReorderDto) {
    const profileId = await this.profileIdForOwner(userId);
    await this.assertReorderItems(
      dto,
      await this.prisma.project.findMany({
        where: { profileId, id: { in: dto.items.map((item) => item.id) } },
        select: { id: true },
      }),
    );
    await this.prisma.$transaction(
      dto.items.map((item) =>
        this.prisma.project.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        }),
      ),
    );
    return this.listProjects(userId);
  }

  private async assertReorderItems(
    dto: ReorderDto,
    ownedRows: Array<{ id: string }>,
  ) {
    const ids = dto.items.map((item) => item.id);
    if (new Set(ids).size !== ids.length || ownedRows.length !== ids.length) {
      throw new BadRequestException("Reorder items contain an invalid or duplicate id");
    }
  }
}
