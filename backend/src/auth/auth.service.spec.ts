import argon2 from "argon2";
import { AuthService } from "./auth.service.js";
import type { PrismaService } from "../prisma/prisma.service.js";
import type { JwtService } from "@nestjs/jwt";

describe("AuthService", () => {
  beforeEach(() => {
    process.env.JWT_SECRET = "test-secret";
  });

  it("verifies an Argon2 password and returns a signed token", async () => {
    const passwordHash = await argon2.hash("secret");
    const prisma = {
      user: { findUnique: vi.fn().mockResolvedValue({ id: "owner", email: "owner@example.com", passwordHash }) },
    } as unknown as PrismaService;
    const sign = vi.fn().mockReturnValue("jwt");
    const jwt = { sign } as unknown as JwtService;
    const service = new AuthService(prisma, jwt);

    await expect(service.login(" OWNER@EXAMPLE.COM ", "secret")).resolves.toEqual({ accessToken: "jwt" });
    expect(sign).toHaveBeenCalledWith(
      { sub: "owner", email: "owner@example.com" },
      expect.objectContaining({ expiresIn: "1d" }),
    );
  });

  it("does not reveal whether the email exists", async () => {
    const prisma = {
      user: { findUnique: vi.fn().mockResolvedValue(null) },
    } as unknown as PrismaService;
    const jwt = { sign: vi.fn() } as unknown as JwtService;
    const service = new AuthService(prisma, jwt);

    await expect(service.login("missing@example.com", "wrong")).rejects.toThrow("Invalid credentials");
  });
});
