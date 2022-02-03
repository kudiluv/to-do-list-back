import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const nestOptions: NestApplicationOptions = {};
  nestOptions.cors = true;
  const app = await NestFactory.create(AppModule, nestOptions);
  const httpAdapter: any = app.getHttpAdapter();
  httpAdapter.set('etag', false);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('To do list')
    .setDescription('Documentation of REST api')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT, () =>
    console.log(`App has been started on ${PORT} port`),
  );
}
bootstrap();
