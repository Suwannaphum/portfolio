import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectStatus } from './generated/prisma/enums.js';
import { PrismaService } from './prisma/prisma.service.js';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getPortfolio() {
    // shortcut: this app has one public profile; add an owner/slug filter for multi-portfolio use.
    const profile = await this.prisma.profile.findFirst({
      include: {
        skills: { orderBy: { sortOrder: 'asc' } },
        experiences: { orderBy: { sortOrder: 'asc' } },
        projects: {
          where: { status: ProjectStatus.PUBLISHED },
          orderBy: { sortOrder: 'asc' },
          include: {
            gallery: { orderBy: { sortOrder: 'asc' } },
          },
        },
      },
    });

    if (!profile) {
      throw new NotFoundException('Portfolio profile not found');
    }

    return profile;
  }
}
