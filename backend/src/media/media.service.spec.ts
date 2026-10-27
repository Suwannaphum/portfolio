import type { PrismaService } from "../prisma/prisma.service.js";
import type { CloudinaryService } from "./cloudinary.service.js";
import { MediaKind } from "./media.dto.js";
import { MediaService } from "./media.service.js";

describe("MediaService", () => {
  const file = (mimetype: string, size: number) => ({ buffer: Buffer.from("file"), mimetype, size });

  it("rejects unsupported MIME types and oversized images", async () => {
    const service = new MediaService({} as PrismaService, {} as CloudinaryService);
    await expect(service.upload("owner", file("text/plain", 4), MediaKind.AVATAR)).rejects.toThrow("Unsupported media type");
    await expect(service.upload("owner", file("image/png", 10 * 1024 * 1024 + 1), MediaKind.AVATAR)).rejects.toThrow("10MB");
  });

  it("passes a valid resume to Cloudinary", async () => {
    const upload = vi.fn().mockResolvedValue({ public_id: "resume", secure_url: "https://res.cloudinary.com/demo/raw/upload/resume.pdf", resource_type: "raw", format: "pdf", bytes: 4 });
    const cloudinary = { upload } as unknown as CloudinaryService;
    const service = new MediaService({} as PrismaService, cloudinary);
    await expect(service.upload("owner", file("application/pdf", 4), MediaKind.RESUME)).resolves.toMatchObject({ data: { publicId: "resume", kind: "resume" } });
    expect(upload).toHaveBeenCalledWith(expect.any(Buffer), true);
  });

  it("requires a project for gallery uploads", async () => {
    const service = new MediaService({} as PrismaService, {} as CloudinaryService);
    await expect(service.upload("owner", file("image/png", 4), MediaKind.GALLERY)).rejects.toThrow("projectId is required");
  });
});
