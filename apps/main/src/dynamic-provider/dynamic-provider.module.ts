import { DynamicModule, Module } from '@nestjs/common';
import { nekaProviders } from './providers';

@Module({})
export class DynamicProviderModule {
  static register(): DynamicModule {
    let imports = [];
    if (process.env.PROJECT_NAME == 'Neka') {
      imports = nekaProviders;
    }
    return {
      module: DynamicProviderModule,
      imports: imports,
      exports: imports,
    };
  }
}
