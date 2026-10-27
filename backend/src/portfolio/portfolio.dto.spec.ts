import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateProjectDto } from "./portfolio.dto.js";

describe("portfolio DTO validation", () => {
  it("rejects non-kebab slugs and non-http URLs", async () => {
    const dto = plainToInstance(CreateProjectDto, {
      title: "Project",
      slug: "Not a slug",
      description: "Description",
      projectUrl: "javascript:alert(1)",
    });
    const errors = await validate(dto);
    expect(errors.map((error) => error.property)).toEqual(expect.arrayContaining(["slug", "projectUrl"]));
  });

  it("rejects required text fields that are blank", async () => {
    const dto = plainToInstance(CreateProjectDto, {
      title: "   ",
      slug: "valid-slug",
      description: "   ",
    });
    const errors = await validate(dto);
    expect(errors.map((error) => error.property)).toEqual(expect.arrayContaining(["title", "description"]));
  });
});
