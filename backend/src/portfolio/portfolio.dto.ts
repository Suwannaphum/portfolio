import { Transform, Type } from "class-transformer";
import { PartialType } from "@nestjs/swagger";
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  Min,
  ValidateNested,
} from "class-validator";
import { ProjectStatus } from "../generated/prisma/enums.js";

const trim = ({ value }: { value: unknown }) =>
  typeof value === "string" ? value.trim() : value;

const httpUrl = { protocols: ["http", "https"], require_protocol: true };

export class UpdateProfileDto {
  @IsOptional()
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  name?: string | null;

  @IsOptional()
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  headline?: string | null;

  @IsOptional()
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  bio?: string | null;

  @IsOptional()
  @Transform(trim)
  @IsString()
  location?: string | null;

  @IsOptional()
  @Transform(trim)
  @IsEmail()
  email?: string | null;

  @IsOptional()
  @IsBoolean()
  availableForOpportunities?: boolean;

  @IsOptional()
  @IsUrl(httpUrl)
  avatarUrl?: string | null;

  @IsOptional()
  @Transform(trim)
  @IsString()
  avatarAlt?: string | null;

  @IsOptional()
  @IsString()
  avatarCloudinaryId?: string | null;

  @IsOptional()
  @IsUrl(httpUrl)
  resumeUrl?: string | null;

  @IsOptional()
  @IsString()
  resumeCloudinaryId?: string | null;

  @IsOptional()
  @IsUrl(httpUrl)
  githubUrl?: string | null;

  @IsOptional()
  @IsUrl(httpUrl)
  linkedinUrl?: string | null;
}

export class CreateSkillDto {
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @Transform(trim)
  @IsString()
  category?: string | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;
}

export class UpdateSkillDto extends PartialType(CreateSkillDto) {}

export class CreateExperienceDto {
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  title!: string;

  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  organization!: string;

  @IsOptional()
  @Transform(trim)
  @IsString()
  type?: string | null;

  @IsDateString()
  startDate!: string;

  @IsOptional()
  @IsDateString()
  endDate?: string | null;

  @IsOptional()
  @Transform(trim)
  @IsString()
  summary?: string | null;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  highlights?: string[];

  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;
}

export class UpdateExperienceDto extends PartialType(CreateExperienceDto) {}

export class ProjectImageDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsUrl(httpUrl)
  imageUrl!: string;

  @IsString()
  @IsNotEmpty()
  cloudinaryId!: string;

  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  alt!: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;
}

export class CreateProjectDto {
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  title!: string;

  @Transform(trim)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  slug!: string;

  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  techStack?: string[];

  @IsOptional()
  @IsUrl(httpUrl)
  coverImageUrl?: string | null;

  @IsOptional()
  @Transform(trim)
  @IsString()
  coverImageAlt?: string | null;

  @IsOptional()
  @IsString()
  coverCloudinaryId?: string | null;

  @IsOptional()
  @IsUrl(httpUrl)
  projectUrl?: string | null;

  @IsOptional()
  @IsUrl(httpUrl)
  sourceUrl?: string | null;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => ProjectImageDto)
  gallery?: ProjectImageDto[];
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}

export class ReorderItemDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsInt()
  @Min(0)
  sortOrder!: number;
}

export class ReorderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReorderItemDto)
  items!: ReorderItemDto[];
}
