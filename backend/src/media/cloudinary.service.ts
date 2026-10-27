import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { v2 as cloudinary } from "cloudinary";

type UploadResult = {
  public_id: string;
  secure_url: string;
  resource_type: string;
  format?: string;
  bytes: number;
};

@Injectable()
export class CloudinaryService {
  private readonly configured: boolean;

  constructor() {
    this.configured = Boolean(
      process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET,
    );
    if (this.configured) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
      });
    }
  }

  upload(buffer: Buffer, isPdf: boolean) {
    if (!this.configured) {
      throw new ServiceUnavailableException("Cloudinary is not configured");
    }

    return new Promise<UploadResult>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "portfolio",
          resource_type: isPdf ? "raw" : "image",
        },
        (error, result) => {
          if (error || !result) {
            reject(error ?? new Error("Cloudinary upload failed"));
            return;
          }
          resolve(result as UploadResult);
        },
      );
      stream.end(buffer);
    });
  }
}
