import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './_commons/exceptions/httpException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 5000;
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: [process.env.ENABLE_CORS_URL_1, process.env.ENABLE_CORS_URL_2],
    credentials: true,
    exposedHeaders: ['Authorization'],
  });

  await app.listen(port);
  console.log(`🚀 ${port}번 포트에서 서버 실행 중입니다.`);
  console.log(`🌐 ${process.env.NODE_ENV} 환경입니다.`);
}
bootstrap();
