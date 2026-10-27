import type {
  Experience,
  Profile,
  Project,
  ProjectImage,
  Skill,
} from "../generated/prisma/client.js";

type ProjectWithGallery = Project & { gallery: ProjectImage[] };

const dateOnly = (value: Date) => value.toISOString().slice(0, 10);

export function mapPublicProfile(profile: Profile) {
  return {
    name: profile.name,
    headline: profile.headline,
    bio: profile.bio,
    location: profile.location,
    availableForOpportunities: profile.availableForOpportunities,
    email: profile.email,
    avatarUrl: profile.avatarUrl,
    avatarAlt: profile.avatarAlt,
    resumeUrl: profile.resumeUrl,
    githubUrl: profile.githubUrl,
    linkedinUrl: profile.linkedinUrl,
  };
}

export function mapAdminProfile(profile: Profile) {
  return {
    ...mapPublicProfile(profile),
    avatarCloudinaryId: profile.avatarCloudinaryId,
    resumeCloudinaryId: profile.resumeCloudinaryId,
    updatedAt: profile.updatedAt,
  };
}

export function mapSkill(skill: Skill) {
  return {
    id: skill.id,
    name: skill.name,
    category: skill.category,
    sortOrder: skill.sortOrder,
  };
}

export function mapExperience(experience: Experience) {
  return {
    id: experience.id,
    title: experience.title,
    organization: experience.organization,
    type: experience.type,
    startDate: dateOnly(experience.startDate),
    endDate: experience.endDate ? dateOnly(experience.endDate) : null,
    summary: experience.summary,
    highlights: experience.highlights,
    sortOrder: experience.sortOrder,
  };
}

export function mapProject(project: ProjectWithGallery, includeStatus = true) {
  return {
    id: project.id,
    title: project.title,
    slug: project.slug,
    description: project.description,
    techStack: project.techStack,
    coverImageUrl: project.coverImageUrl,
    coverImageAlt: project.coverImageAlt,
    ...(includeStatus ? { coverCloudinaryId: project.coverCloudinaryId } : {}),
    projectUrl: project.projectUrl,
    sourceUrl: project.sourceUrl,
    ...(includeStatus ? { status: project.status } : {}),
    sortOrder: project.sortOrder,
    gallery: project.gallery.map((image) => ({
      id: image.id,
      imageUrl: image.imageUrl,
      ...(includeStatus ? { cloudinaryId: image.cloudinaryId } : {}),
      alt: image.alt,
      sortOrder: image.sortOrder,
    })),
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
}
