import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

describe('AppController', () => {
  let appController: AppController;
  const appService = {
    getPortfolio: vi.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: appService }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('portfolio', () => {
    it('returns the portfolio from the service', async () => {
      const portfolio = { name: 'Mhailele' };
      appService.getPortfolio.mockResolvedValue(portfolio);

      await expect(appController.getPortfolio()).resolves.toBe(portfolio);
      expect(appService.getPortfolio).toHaveBeenCalledOnce();
    });
  });
});
