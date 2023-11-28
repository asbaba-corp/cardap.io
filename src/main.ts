import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from '@/app.module';
import { HttpExceptionFilter } from '@/infra/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  
  const config = new DocumentBuilder()
    .setTitle('Cardap.io')
    .setDescription('The cardap.io API description')
    .setVersion('1.0')
    .addTag('cardap.io')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
