// src/shared/seeder/seeder.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from '@config/database.config';
import { ConfigModule } from '@nestjs/config';
import {
  PermissionSeeder,
  RoleSeeder,
  AssignRolePermissionsSeeder,
  UserSeeder,
} from '@shared/seeder';
import {
  Permission,
  PermissionSchema,
} from '@modules/permission/permission.schema';
import { Role, RoleSchema } from '@modules/role/role.schema';
import { User, UserSchema } from '@modules/user/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI,
        autoIndex: true,
      }),
    }),
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
      { name: Role.name, schema: RoleSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [
    PermissionSeeder,
    RoleSeeder,
    AssignRolePermissionsSeeder,
    UserSeeder,
  ],
})
export class SeederModule {}
