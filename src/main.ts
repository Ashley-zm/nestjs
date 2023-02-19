// 应用程序入口文件。它使用 NestFactory 用来创建 Nest 应用实例。
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// Swagger 模块
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
// 响应拦截器
import { TransformInterceptor } from './interseptor/transform.interceptor';
// 异常过滤器
import { HttpExceptionFilter } from './interseptor/http-exception.filter';

//配置 swagger
const setupSwagger = (app) => {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('NEST API')
    .setDescription('nest-test的 API 文档')
    .setVersion('1.0')
    .build();
  // 创建
  const document = SwaggerModule.createDocument(app, config);
  // 启动
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 挂载拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 传入app 访问http:localhost:3001/docs
  setupSwagger(app);

  await app.listen(3001);
}
bootstrap();
