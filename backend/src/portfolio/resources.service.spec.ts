import type { PrismaService } from "../prisma/prisma.service.js";
import { ResourcesService } from "./resources.service.js";

describe("ResourcesService", () => {
  it("reorders only owned rows in one transaction", async () => {
    const skillRows = [
      { id: "a", profileId: "profile", name: "A", category: null, sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: "b", profileId: "profile", name: "B", category: null, sortOrder: 2, createdAt: new Date(), updatedAt: new Date() },
    ];
    const findMany = vi.fn((args: { select?: unknown }) =>
      Promise.resolve(args.select ? [{ id: "a" }, { id: "b" }] : skillRows),
    );
    const update = vi.fn().mockResolvedValue({});
    const transaction = vi.fn().mockResolvedValue([]);
    const prisma = {
      profile: { findUnique: vi.fn().mockResolvedValue({ id: "profile" }) },
      skill: { findMany, update, count: vi.fn().mockResolvedValue(2) },
      $transaction: transaction,
    } as unknown as PrismaService;
    const service = new ResourcesService(prisma);

    await service.reorderSkills("owner", { items: [{ id: "b", sortOrder: 1 }, { id: "a", sortOrder: 2 }] });
    expect(transaction).toHaveBeenCalledOnce();
    expect(update).toHaveBeenCalledWith({ where: { id: "b" }, data: { sortOrder: 1 } });
    expect(update).toHaveBeenCalledWith({ where: { id: "a" }, data: { sortOrder: 2 } });
  });

  it("rejects duplicate reorder ids", async () => {
    const prisma = {
      profile: { findUnique: vi.fn().mockResolvedValue({ id: "profile" }) },
      skill: { findMany: vi.fn().mockResolvedValue([{ id: "a" }]) },
      $transaction: vi.fn(),
    } as unknown as PrismaService;
    const service = new ResourcesService(prisma);

    await expect(service.reorderSkills("owner", { items: [{ id: "a", sortOrder: 1 }, { id: "a", sortOrder: 2 }] })).rejects.toThrow("invalid or duplicate");
  });
});
