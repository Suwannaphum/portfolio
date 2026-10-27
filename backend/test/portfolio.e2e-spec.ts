import cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/app.module.js";

process.env.DATABASE_URL ??= "postgresql://portfolio:change-me@127.0.0.1:5432/portfolio";
process.env.JWT_SECRET ??= "change-me";

describe("Portfolio API (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    await app.init();
  });

  afterAll(async () => app.close());

  it("returns only published public data", async () => {
    const response = await request(app.getHttpServer()).get("/portfolio").expect(200);
    expect(response.body.projects.every((project: { status?: string }) => !project.status)).toBe(true);
    expect(JSON.stringify(response.body)).not.toContain("Draft Project Demo");
    expect(JSON.stringify(response.body)).not.toContain("Cloudinary");
    expect(JSON.stringify(response.body)).not.toContain("passwordHash");
  });

  it("protects admin access and validates CSRF on mutation", async () => {
    await request(app.getHttpServer()).get("/portfolio/admin/summary").expect(401);
    const agent = request.agent(app.getHttpServer());
    const csrf = await agent.get("/auth/csrf").expect(200);
    await agent
      .post("/auth/login")
      .set("Origin", "http://localhost:3001")
      .send({ email: "owner@example.com", password: "change-me" })
      .expect(200);
    await agent
      .patch("/portfolio/admin/profile")
      .set("Origin", "http://localhost:3001")
      .send({ name: "Demo Developer" })
      .expect(403);
    await agent
      .patch("/portfolio/admin/profile")
      .set("Origin", "http://localhost:3001")
      .set("X-CSRF-Token", csrf.body.csrfToken)
      .send({ name: "Demo Developer" })
      .expect(200);
  });

  it("supports authenticated resource CRUD, reorder, and publish filtering", async () => {
    const agent = request.agent(app.getHttpServer());
    const csrf = await agent.get("/auth/csrf").expect(200);
    const csrfToken = csrf.body.csrfToken as string;
    const origin = "http://localhost:3001";
    await agent
      .post("/auth/login")
      .set("Origin", origin)
      .send({ email: "owner@example.com", password: "change-me" })
      .expect(200);

    const skill = await agent
      .post("/portfolio/admin/skills")
      .set("Origin", origin)
      .set("X-CSRF-Token", csrfToken)
      .send({ name: "E2E Testing", category: "Quality", sortOrder: 99 })
      .expect(201);
    const skillId = skill.body.data.id as string;
    await agent
      .patch(`/portfolio/admin/skills/${skillId}`)
      .set("Origin", origin)
      .set("X-CSRF-Token", csrfToken)
      .send({ name: "E2E Testing Updated" })
      .expect(200);
    await agent
      .patch("/portfolio/admin/skills/reorder")
      .set("Origin", origin)
      .set("X-CSRF-Token", csrfToken)
      .send({ items: [{ id: skillId, sortOrder: 0 }] })
      .expect(200);

    const experience = await agent
      .post("/portfolio/admin/experiences")
      .set("Origin", origin)
      .set("X-CSRF-Token", csrfToken)
      .send({
        title: "E2E Role",
        organization: "Test Company",
        startDate: "2025-01-01",
        sortOrder: 99,
      })
      .expect(201);
    const experienceId = experience.body.data.id as string;
    await agent
      .patch(`/portfolio/admin/experiences/${experienceId}`)
      .set("Origin", origin)
      .set("X-CSRF-Token", csrfToken)
      .send({ summary: "Updated by API e2e" })
      .expect(200);
    await agent
      .patch("/portfolio/admin/experiences/reorder")
      .set("Origin", origin)
      .set("X-CSRF-Token", csrfToken)
      .send({ items: [{ id: experienceId, sortOrder: 0 }] })
      .expect(200);

    const slug = `e2e-project-${Date.now()}`;
    const project = await agent
      .post("/portfolio/admin/projects")
      .set("Origin", origin)
      .set("X-CSRF-Token", csrfToken)
      .send({
        title: "E2E Draft Project",
        slug,
        description: "Created by API e2e",
        status: "DRAFT",
        sortOrder: 99,
        techStack: ["Testing"],
        gallery: [],
      })
      .expect(201);
    const projectId = project.body.data.id as string;
    try {
      const draftPublic = await agent.get("/portfolio").expect(200);
      expect(draftPublic.body.projects.some((item: { slug: string }) => item.slug === slug)).toBe(false);

      await agent
        .patch(`/portfolio/admin/projects/${projectId}`)
        .set("Origin", origin)
        .set("X-CSRF-Token", csrfToken)
        .send({ title: "E2E Published Project", status: "PUBLISHED" })
        .expect(200);
      const publishedPublic = await agent.get("/portfolio").expect(200);
      expect(publishedPublic.body.projects.some((item: { slug: string; title: string }) => item.slug === slug && item.title === "E2E Published Project")).toBe(true);

      await agent
        .patch("/portfolio/admin/projects/reorder")
        .set("Origin", origin)
        .set("X-CSRF-Token", csrfToken)
        .send({ items: [{ id: projectId, sortOrder: 0 }] })
        .expect(200);
    } finally {
      await agent
        .delete(`/portfolio/admin/projects/${projectId}`)
        .set("Origin", origin)
        .set("X-CSRF-Token", csrfToken)
        .expect(200);
      await agent
        .delete(`/portfolio/admin/experiences/${experienceId}`)
        .set("Origin", origin)
        .set("X-CSRF-Token", csrfToken)
        .expect(200);
      await agent
        .delete(`/portfolio/admin/skills/${skillId}`)
        .set("Origin", origin)
        .set("X-CSRF-Token", csrfToken)
        .expect(200);
    }

    await agent
      .post("/auth/logout")
      .set("Origin", origin)
      .set("X-CSRF-Token", csrfToken)
      .expect(200);
    await agent.get("/portfolio/admin/summary").expect(401);
  });
});
