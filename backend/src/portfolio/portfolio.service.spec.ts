import { ProjectStatus } from "../generated/prisma/enums.js";
import type { PrismaService } from "../prisma/prisma.service.js";
import { PortfolioService } from "./portfolio.service.js";

describe("PortfolioService", () => {
  it("filters drafts and strips internal fields from public output", async () => {
    const profile = {
      id: "profile",
      ownerId: "owner",
      name: "Developer",
      headline: "Builds products",
      bio: "Bio",
      location: "Bangkok",
      email: "owner@example.com",
      availableForOpportunities: true,
      avatarUrl: null,
      avatarAlt: null,
      avatarCloudinaryId: "avatar-secret",
      resumeUrl: null,
      resumeCloudinaryId: "resume-secret",
      githubUrl: "https://github.com/example",
      linkedinUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      skills: [{ id: "skill", profileId: "profile", name: "TypeScript", category: "Frontend", sortOrder: 1, createdAt: new Date(), updatedAt: new Date() }],
      experiences: [],
      projects: [{
        id: "published",
        profileId: "profile",
        title: "Published",
        slug: "published",
        description: "Public project",
        techStack: ["NestJS"],
        coverImageUrl: null,
        coverImageAlt: null,
        coverCloudinaryId: "cover-secret",
        projectUrl: null,
        sourceUrl: null,
        status: ProjectStatus.PUBLISHED,
        sortOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        gallery: [{ id: "image", projectId: "published", imageUrl: "https://example.com/image.png", cloudinaryId: "gallery-secret", alt: "Image", sortOrder: 1, createdAt: new Date(), updatedAt: new Date() }],
      }],
    };
    const findFirst = vi.fn().mockResolvedValue(profile);
    const service = new PortfolioService({ profile: { findFirst } } as unknown as PrismaService);

    const result = await service.getPublicPortfolio();
    expect(findFirst).toHaveBeenCalledWith(expect.objectContaining({
      include: expect.objectContaining({
        projects: expect.objectContaining({ where: { status: ProjectStatus.PUBLISHED } }),
      }),
    }));
    const serialized = JSON.stringify(result);
    expect(serialized).not.toContain("ownerId");
    expect(serialized).not.toContain("Cloudinary");
    expect(serialized).not.toContain("secret");
    expect(result.projects).toHaveLength(1);
  });
});
