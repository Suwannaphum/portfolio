import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ProjectStatus } from "../generated/prisma/enums.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { UpdateProfileDto } from "./portfolio.dto.js";
import {
  mapAdminProfile,
  mapExperience,
  mapProject,
  mapPublicProfile,
  mapSkill,
} from "./portfolio.mapper.js";

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) {}

  async getPublicPortfolio() {
    const profile = await this.prisma.profile.findFirst({
      include: {
        skills: { orderBy: { sortOrder: "asc" } },
        experiences: { orderBy: { sortOrder: "asc" } },
        projects: {
          where: { status: ProjectStatus.PUBLISHED },
          orderBy: { sortOrder: "asc" },
          include: { gallery: { orderBy: { sortOrder: "asc" } } },
        },
      },
    });
    if (!profile) throw new NotFoundException("Portfolio profile not found");

    return {
      profile: mapPublicProfile(profile),
      skills: profile.skills.map(mapSkill),
      experiences: profile.experiences.map(mapExperience),
      projects: profile.projects.map((project) => mapProject(project, false)),
    };
  }

  async getAdminProfile(userId: string) {
    return { data: mapAdminProfile(await this.profileForOwner(userId)) };
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const profile = await this.profileForOwner(userId);
    const next = {
      name: dto.name ?? profile.name,
      headline: dto.headline ?? profile.headline,
      bio: dto.bio ?? profile.bio,
    };
    for (const field of ["name", "headline", "bio"] as const) {
      if (typeof next[field] !== "string" || next[field].trim() === "") {
        throw new BadRequestException(`${field} must not be empty`);
      }
    }

    const data = {
      ...(dto.name !== undefined ? { name: dto.name! } : {}),
      ...(dto.headline !== undefined ? { headline: dto.headline! } : {}),
      ...(dto.bio !== undefined ? { bio: dto.bio! } : {}),
      ...(dto.location !== undefined ? { location: dto.location } : {}),
      ...(dto.email !== undefined ? { email: dto.email } : {}),
      ...(dto.availableForOpportunities !== undefined
        ? { availableForOpportunities: dto.availableForOpportunities }
        : {}),
      ...(dto.avatarUrl !== undefined ? { avatarUrl: dto.avatarUrl } : {}),
      ...(dto.avatarAlt !== undefined ? { avatarAlt: dto.avatarAlt } : {}),
      ...(dto.avatarCloudinaryId !== undefined
        ? { avatarCloudinaryId: dto.avatarCloudinaryId }
        : {}),
      ...(dto.resumeUrl !== undefined ? { resumeUrl: dto.resumeUrl } : {}),
      ...(dto.resumeCloudinaryId !== undefined
        ? { resumeCloudinaryId: dto.resumeCloudinaryId }
        : {}),
      ...(dto.githubUrl !== undefined ? { githubUrl: dto.githubUrl } : {}),
      ...(dto.linkedinUrl !== undefined ? { linkedinUrl: dto.linkedinUrl } : {}),
      ...(dto.email ? { email: dto.email.toLowerCase() } : {}),
      ...(dto.avatarUrl === null ? { avatarCloudinaryId: null } : {}),
      ...(dto.resumeUrl === null ? { resumeCloudinaryId: null } : {}),
    };
    const updated = await this.prisma.profile.update({
      where: { id: profile.id },
      data,
    });
    return { data: mapAdminProfile(updated) };
  }

  async getSummary(userId: string) {
    const profile = await this.profileForOwner(userId);
    const [draftProjects, publishedProjects, skills, experiences] =
      await Promise.all([
        this.prisma.project.count({
          where: { profileId: profile.id, status: ProjectStatus.DRAFT },
        }),
        this.prisma.project.count({
          where: { profileId: profile.id, status: ProjectStatus.PUBLISHED },
        }),
        this.prisma.skill.count({ where: { profileId: profile.id } }),
        this.prisma.experience.count({ where: { profileId: profile.id } }),
      ]);

    const completenessFields = [
      profile.name,
      profile.headline,
      profile.bio,
      profile.location,
      profile.email,
      profile.avatarUrl,
      profile.resumeUrl,
      profile.githubUrl,
      profile.linkedinUrl,
    ];
    const complete = completenessFields.filter(
      (value) => typeof value === "string" && value.trim() !== "",
    ).length;

    return {
      data: {
        draftProjects,
        publishedProjects,
        skills,
        experiences,
        profileCompleteness: complete / completenessFields.length,
      },
    };
  }

  async profileForOwner(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { ownerId: userId },
    });
    if (!profile) throw new NotFoundException("Portfolio profile not found");
    return profile;
  }
}
