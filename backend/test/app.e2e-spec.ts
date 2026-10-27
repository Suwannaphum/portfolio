import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/portfolio (GET)', () => {
    return request(app.getHttpServer())
      .get('/portfolio')
      .expect(200)
      .expect(({ body }) => {
        expect(body.name).toBeDefined();
        expect(body.projects).toBeInstanceOf(Array);
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
