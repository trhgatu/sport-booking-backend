import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Venue, VenueDocument } from './venue.schema';
import { Model } from 'mongoose';
import { CreateVenueDto, UpdateVenueDto, QueryVenueDto } from './dtos';
import { paginate } from '@shared/utils';
import { CacheService } from '@shared/services/cache.service';

@Injectable()
export class VenueService {
  constructor(
    @InjectModel(Venue.name) private VenueModel: Model<VenueDocument>,
    private readonly cacheService: CacheService,
  ) {}

  async create(dto: CreateVenueDto) {
    return await this.VenueModel.create(dto);
  }

  async findAll(query: QueryVenueDto) {
    const { page = 1, limit = 10, keyword } = query;
    const skip = (page - 1) * limit;

    const search = keyword ? { name: { $regex: keyword, $options: 'i' } } : {};

    const cacheKey = `venues:all:${keyword || 'all'}:p${page}:l${limit}`;
    const cached = await this.cacheService.get(cacheKey);
    if (cached) return cached;

    const result = await paginate(
      this.VenueModel.find(search).skip(skip).limit(limit).populate('ownerId'),
      this.VenueModel.countDocuments(search),
      page,
      limit,
    );

    await this.cacheService.set(cacheKey, result, 60);
    return result;
  }

  async findById(id: string) {
    const Venue = await this.VenueModel.findById(id).populate('ownerId');
    if (!Venue) throw new NotFoundException('Venue not found');
    return Venue;
  }

  async update(id: string, dto: UpdateVenueDto) {
    const updated = await this.VenueModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Venue not found');

    await this.cacheService.deleteByPattern('venues:all:*');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.VenueModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Venue not found');

    await this.cacheService.deleteByPattern('venues:all:*');
    return deleted;
  }
}
