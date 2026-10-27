import "dotenv/config";
import cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: [
      process.env.FRONTEND_URL ?? "http://localhost:3001",
      "http://localhost:3001",
      "http://127.0.0.1:3001",
    ],
    credentials: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Personal Portfolio API")
    .setDescription("Single-owner portfolio CMS API")
    .setVersion("1.0")
    .addCookieAuth("session")
    .build();
  SwaggerModule.setup(
    "docs",
    app,
    SwaggerModule.createDocument(app, swaggerConfig),
  );

  await app.listen(process.env.PORT ?? 3000, "0.0.0.0");
}

await bootstrap();
