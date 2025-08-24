// src/shared/seeder/user/user.seeder.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@modules/user/user.schema';
import { Role, RoleDocument } from '@modules/role/role.schema';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Role.name)
    private readonly roleModel: Model<RoleDocument>,
  ) {}

  async seed() {
    const existing = await this.userModel.countDocuments();
    if (existing > 0) {
      console.log('⚠️  Users already exist. Skipping seed.');
      return;
    }

    const role = await this.roleModel.findOne({ name: 'Admin' });
    if (!role) {
      throw new Error('❌ Admin role not found. Seed role first.');
    }

    const newUser = await this.userModel.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      roleId: role._id,
    });

    console.log(`✅ Seeded user: ${newUser.email}`);
  }
}
