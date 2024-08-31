import {
  INestApplication,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoginModule } from './login/login.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [LoginModule, ContactModule],
})
export class NekaModule implements NestModule {
  constructor() {}
  private app: INestApplication;
  configure(consumer: MiddlewareConsumer) {}
  async setApp(app: INestApplication<any>) {
    this.app = app;
    const coreConfig = new DocumentBuilder()
      .setTitle('Neka Api')
      .setDescription('The Neka API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const coreDocument = SwaggerModule.createDocument(this.app, coreConfig, {
      include: [NekaModule],
      deepScanRoutes: true,
    });
    SwaggerModule.setup('api/neka', this.app, coreDocument);
  }
}
