import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Court, CourtSchema } from './court.schema';
import { CourtAdminController } from './court.admin.controller';
import { CourtService } from './court.service';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Court.name, schema: CourtSchema }]),
    SharedModule,
  ],
  controllers: [CourtAdminController],
  providers: [CourtService],
  exports: [CourtService],
})
export class CourtModule {}
