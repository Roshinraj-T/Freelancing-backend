import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: true })
  const config = new DocumentBuilder()
    .setTitle('GigHub')
    .setDescription('CRUD Using NestJS and MySQL').
    setVersion('1.0')
    .addTag('CRUD').build();
  const document = SwaggerModule.createDocument(app, config); SwaggerModule.setup('gighub',
    app, document);
  await app.listen(process.env.PORT);

}
bootstrap();
