import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Venue, VenueSchema } from './venue.schema';
import { VenueAdminController } from './venue.admin.controller';
import { VenueService } from './venue.service';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Venue.name, schema: VenueSchema }]),
    SharedModule,
  ],
  controllers: [VenueAdminController],
  providers: [VenueService],
  exports: [VenueService],
})
export class VenueModule {}
