import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import argon2 from "argon2";
import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });
    let valid = false;
    if (user) {
      try {
        valid = await argon2.verify(user.passwordHash, password);
      } catch {
        valid = false;
      }
    }
    if (!user || !valid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is required");
    return {
      accessToken: this.jwt.sign(
        { sub: user.id, email: user.email },
        { secret, expiresIn: "1d" },
      ),
    };
  }
}
