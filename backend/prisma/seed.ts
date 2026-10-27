import "dotenv/config";
import argon2 from "argon2";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { ProjectStatus } from "../src/generated/prisma/enums.js";

const connectionString = process.env.DATABASE_URL;
const email = process.env.SEED_ADMIN_EMAIL;
const password = process.env.SEED_ADMIN_PASSWORD;

if (!connectionString) throw new Error("DATABASE_URL is required");
if (!email || !password) {
  throw new Error("SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD are required");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  const passwordHash = await argon2.hash(password);
  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  const profile = await prisma.profile.upsert({
    where: { ownerId: user.id },
    update: {
      name: "Demo Developer",
      headline: "Full Stack Developer building useful products.",
      bio: "This is sample portfolio content for local development and API testing.",
      location: "Bangkok, Thailand",
      email,
      availableForOpportunities: true,
      githubUrl: "https://github.com/example",
      linkedinUrl: "https://www.linkedin.com/in/example",
    },
    create: {
      ownerId: user.id,
      name: "Demo Developer",
      headline: "Full Stack Developer building useful products.",
      bio: "This is sample portfolio content for local development and API testing.",
      location: "Bangkok, Thailand",
      email,
      availableForOpportunities: true,
      githubUrl: "https://github.com/example",
      linkedinUrl: "https://www.linkedin.com/in/example",
    },
  });

  for (const skill of [
    ["seed-skill-typescript", "TypeScript", "Frontend", 1],
    ["seed-skill-nextjs", "Next.js", "Frontend", 2],
    ["seed-skill-nestjs", "NestJS", "Backend", 3],
    ["seed-skill-postgresql", "PostgreSQL", "Database", 4],
  ] as const) {
    await prisma.skill.upsert({
      where: { id: skill[0] },
      update: {
        name: skill[1],
        category: skill[2],
        sortOrder: skill[3],
        profileId: profile.id,
      },
      create: {
        id: skill[0],
        name: skill[1],
        category: skill[2],
        sortOrder: skill[3],
        profileId: profile.id,
      },
    });
  }

  for (const experience of [
    {
      id: "seed-experience-current",
      title: "Full Stack Developer",
      organization: "Demo Company",
      type: "Work",
      startDate: new Date("2024-01-01T00:00:00.000Z"),
      endDate: null,
      summary: "Build and maintain web applications across the frontend and backend.",
      highlights: ["Designed REST APIs", "Improved application performance"],
      sortOrder: 1,
    },
    {
      id: "seed-experience-education",
      title: "Computer Science",
      organization: "Demo University",
      type: "Education",
      startDate: new Date("2020-01-01T00:00:00.000Z"),
      endDate: new Date("2023-12-31T00:00:00.000Z"),
      summary: "Studied software development, databases, and system design.",
      highlights: [],
      sortOrder: 2,
    },
  ] as const) {
    await prisma.experience.upsert({
      where: { id: experience.id },
      update: { ...experience, profileId: profile.id },
      create: { ...experience, profileId: profile.id },
    });
  }

  for (const project of [
    {
      slug: "portfolio-api-demo",
      title: "Portfolio API Demo",
      description: "A sample project used to verify the public portfolio API.",
      techStack: ["NestJS", "Prisma", "PostgreSQL"],
      status: ProjectStatus.PUBLISHED,
      sortOrder: 1,
      projectUrl: "https://example.com/portfolio-api-demo",
      sourceUrl: "https://github.com/example/portfolio-api-demo",
      coverImageUrl: "https://placehold.co/1200x800/png?text=Portfolio+API",
      coverImageAlt: "Portfolio API Demo preview",
      coverCloudinaryId: null,
      gallery: [
        {
          imageUrl: "https://placehold.co/1200x800/png?text=API+Screen",
          cloudinaryId: "seed/portfolio-api-demo/api-screen",
          alt: "Portfolio API screen",
          sortOrder: 1,
        },
      ],
    },
    {
      slug: "draft-project-demo",
      title: "Draft Project Demo",
      description: "This project should never appear in the public portfolio response.",
      techStack: ["Next.js", "TypeScript"],
      status: ProjectStatus.DRAFT,
      sortOrder: 2,
      projectUrl: null,
      sourceUrl: null,
      coverImageUrl: "https://placehold.co/1200x800/png?text=Draft+Project",
      coverImageAlt: "Draft project preview",
      coverCloudinaryId: null,
      gallery: [],
    },
  ] as const) {
    const { gallery, ...projectData } = project;
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        ...projectData,
        profileId: profile.id,
        gallery: { deleteMany: {}, create: gallery },
      },
      create: {
        ...projectData,
        profileId: profile.id,
        gallery: { create: gallery },
      },
    });
  }

  console.log(`Seeded demo portfolio data for ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
