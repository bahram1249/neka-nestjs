import {
  INestApplication,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoginModule } from './login/login.module';
import { TerminalModule } from './terminal/terminal.module';
import { CreditInfoModule } from './credit-info/credit-info.module';
import { PurchaseServiceModule } from './purchase-service/purchase-service.module';
import { ServiceProductModule } from './service-product/service-product.module';
import { TransactionModule } from './transaction/transaction.module';
import { IranKishPaymentModule } from './payment/irankish-payment/irankish-payment.module';

@Module({
  imports: [
    LoginModule,
    TerminalModule,
    CreditInfoModule,
    PurchaseServiceModule,
    ServiceProductModule,
    TransactionModule,
    IranKishPaymentModule,
  ],
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
