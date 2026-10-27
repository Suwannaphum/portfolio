export type Skill = {
  id: string;
  name: string;
  category: string | null;
  sortOrder: number;
};

export type Experience = {
  id: string;
  title: string;
  organization: string;
  type: string | null;
  startDate: string;
  endDate: string | null;
  summary: string | null;
  highlights: string[];
  sortOrder: number;
};

export type GalleryImage = {
  id: string;
  imageUrl: string;
  alt: string;
  sortOrder: number;
  cloudinaryId?: string;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  coverCloudinaryId?: string | null;
  projectUrl: string | null;
  sourceUrl: string | null;
  status?: "DRAFT" | "PUBLISHED";
  sortOrder: number;
  gallery: GalleryImage[];
  createdAt?: string;
  updatedAt?: string;
};

export type PublicProfile = {
  name: string;
  headline: string;
  bio: string;
  location: string | null;
  availableForOpportunities: boolean;
  email: string | null;
  avatarUrl: string | null;
  avatarAlt: string | null;
  resumeUrl: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
};

export type Portfolio = {
  profile: PublicProfile;
  skills: Skill[];
  experiences: Experience[];
  projects: Project[];
};

export type AdminProfile = PublicProfile & {
  avatarCloudinaryId: string | null;
  resumeCloudinaryId: string | null;
  updatedAt: string;
};

export type Summary = {
  draftProjects: number;
  publishedProjects: number;
  skills: number;
  experiences: number;
  profileCompleteness: number;
};

export type MediaUpload = {
  url: string;
  publicId: string;
  resourceType: string;
  format: string;
  bytes: number;
  kind: string;
};
