import { Transform } from "class-transformer";
import { IsEnum, IsOptional, IsString } from "class-validator";

export enum MediaKind {
  AVATAR = "AVATAR",
  RESUME = "RESUME",
  COVER = "COVER",
  GALLERY = "GALLERY",
}

export class UploadMediaDto {
  @Transform(({ value }) =>
    typeof value === "string" ? value.toUpperCase() : value,
  )
  @IsEnum(MediaKind)
  kind!: MediaKind;

  @IsOptional()
  @IsString()
  projectId?: string;
}

export interface UploadedMediaFile {
  buffer: Buffer;
  mimetype: string;
  size: number;
}
