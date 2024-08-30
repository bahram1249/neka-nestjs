import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeOverrideModule } from './override/sequelize-override.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Dialect } from 'sequelize';
import { Menu } from './models/core/menu.entity';
import { PermissionMenu } from './models/core/permission-menu.entity';
import { Permission } from './models/core/permission.entity';
import { User } from './models/core/user.entity';
import { UserRole } from './models/core/userRole.entity';
import { Role } from './models/core/role.entity';
import { RolePermission } from './models/core/rolePermission.entity';
import { PermissionGroup } from './models/core/permissionGroup.entity';
import { Setting } from './models/core/setting.entity';
import { WinstonLog } from './models/core/winstonlog.entity';

@Module({
  imports: [
    SequelizeOverrideModule.override(),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        name: 'sequelize_default',
        dialect: configService.get<Dialect>('DB_DIALECT'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME_DEVELOPMENT'),
        models: [
          Menu,
          PermissionMenu,
          Permission,
          User,
          UserRole,
          Role,
          RolePermission,
          PermissionGroup,
          Setting,
          WinstonLog,
        ],
        autoLoadModels: configService.get('DB_AUTO_LOAD_MODELS') === 'true',
        logging: configService.get('DB_LOG') === 'true',
        synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
        timezone: configService.get('DB_TIMEZONE') || 'fa-IR',
        sync: {
          force: false,
          alter: false,
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
