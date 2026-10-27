import 'dotenv/config';
import argon2 from 'argon2';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { ProjectStatus } from '../src/generated/prisma/enums.js';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is required');
}

const email = process.env.SEED_ADMIN_EMAIL ?? '';
const password = process.env.SEED_ADMIN_PASSWORD ?? '';

if (!email || !password) {
  throw new Error('SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD are required');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash: await argon2.hash(password),
    },
    create: {
      email,
      passwordHash: await argon2.hash(password),
    },
  });

  const profile = await prisma.profile.upsert({
    where: { ownerId: user.id },
    update: {
      name: 'Demo Developer',
      headline: 'Full Stack Developer building useful products.',
      bio: 'This is sample portfolio content for local development and API testing.',
      location: 'Bangkok, Thailand',
      email,
      githubUrl: 'https://github.com/example',
      linkedinUrl: 'https://www.linkedin.com/in/example',
    },
    create: {
      ownerId: user.id,
      name: 'Demo Developer',
      headline: 'Full Stack Developer building useful products.',
      bio: 'This is sample portfolio content for local development and API testing.',
      location: 'Bangkok, Thailand',
      email,
      githubUrl: 'https://github.com/example',
      linkedinUrl: 'https://www.linkedin.com/in/example',
    },
  });

  const skills = [
    {
      id: 'seed-skill-typescript',
      name: 'TypeScript',
      category: 'Frontend',
      sortOrder: 1,
    },
    {
      id: 'seed-skill-nextjs',
      name: 'Next.js',
      category: 'Frontend',
      sortOrder: 2,
    },
    {
      id: 'seed-skill-nestjs',
      name: 'NestJS',
      category: 'Backend',
      sortOrder: 3,
    },
    {
      id: 'seed-skill-postgresql',
      name: 'PostgreSQL',
      category: 'Database',
      sortOrder: 4,
    },
  ];

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { id: skill.id },
      update: {
        name: skill.name,
        category: skill.category,
        sortOrder: skill.sortOrder,
        profileId: profile.id,
      },
      create: { ...skill, profileId: profile.id },
    });
  }

  const experiences = [
    {
      id: 'seed-experience-current',
      title: 'Full Stack Developer',
      organization: 'Demo Company',
      type: 'Work',
      startDate: new Date('2024-01-01T00:00:00.000Z'),
      endDate: null,
      summary:
        'Build and maintain web applications across the frontend and backend.',
      highlights: ['Designed REST APIs', 'Improved application performance'],
      sortOrder: 1,
    },
    {
      id: 'seed-experience-education',
      title: 'Computer Science',
      organization: 'Demo University',
      type: 'Education',
      startDate: new Date('2020-01-01T00:00:00.000Z'),
      endDate: new Date('2023-12-31T00:00:00.000Z'),
      summary: 'Studied software development, databases, and system design.',
      highlights: [],
      sortOrder: 2,
    },
  ];

  for (const experience of experiences) {
    const { id, ...experienceData } = experience;

    await prisma.experience.upsert({
      where: { id },
      update: { ...experienceData, profileId: profile.id },
      create: { id, ...experienceData, profileId: profile.id },
    });
  }

  const projects = [
    {
      slug: 'portfolio-api-demo',
      title: 'Portfolio API Demo',
      description: 'A sample project used to verify the public portfolio API.',
      techStack: ['NestJS', 'Prisma', 'PostgreSQL'],
      status: ProjectStatus.PUBLISHED,
      sortOrder: 1,
      projectUrl: 'https://example.com/portfolio-api-demo',
      sourceUrl: 'https://github.com/example/portfolio-api-demo',
      coverImageUrl: 'https://placehold.co/1200x800/png?text=Portfolio+API',
      coverImageAlt: 'Portfolio API Demo preview',
      coverCloudinaryId: null,
      gallery: [
        {
          imageUrl: 'https://placehold.co/1200x800/png?text=API+Screen',
          cloudinaryId: 'seed/portfolio-api-demo/api-screen',
          alt: 'Portfolio API screen',
          sortOrder: 1,
        },
      ],
    },
    {
      slug: 'draft-project-demo',
      title: 'Draft Project Demo',
      description:
        'This project should never appear in the public portfolio response.',
      techStack: ['Next.js', 'TypeScript'],
      status: ProjectStatus.DRAFT,
      sortOrder: 2,
      projectUrl: null,
      sourceUrl: null,
      coverImageUrl: 'https://placehold.co/1200x800/png?text=Draft+Project',
      coverImageAlt: 'Draft project preview',
      coverCloudinaryId: null,
      gallery: [],
    },
  ];

  for (const project of projects) {
    const { gallery, ...projectData } = project;

    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        ...projectData,
        profileId: profile.id,
        gallery: {
          deleteMany: {},
          create: gallery,
        },
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
  .finally(async () => {
    await prisma.$disconnect();
  });
