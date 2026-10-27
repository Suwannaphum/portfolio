import { AppService } from './app.service.js';
import { ProjectStatus } from './generated/prisma/enums.js';
import { PrismaService } from './prisma/prisma.service.js';

describe('AppService', () => {
  it('loads the profile and only published projects', async () => {
    const findFirst = vi.fn().mockResolvedValue({ name: 'Mhailele' });
    const prisma = {
      profile: { findFirst },
    } as unknown as PrismaService;
    const service = new AppService(prisma);

    await expect(service.getPortfolio()).resolves.toEqual({ name: 'Mhailele' });
    expect(findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        include: expect.objectContaining({
          projects: expect.objectContaining({
            where: { status: ProjectStatus.PUBLISHED },
          }),
        }),
      }),
    );
  });

  it('returns 404 when no profile exists', async () => {
    const prisma = {
      profile: { findFirst: vi.fn().mockResolvedValue(null) },
    } as unknown as PrismaService;
    const service = new AppService(prisma);

    await expect(service.getPortfolio()).rejects.toThrow(
      'Portfolio profile not found',
    );
  });
});
