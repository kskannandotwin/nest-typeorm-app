import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataItem } from './entities/data.entity';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(DataItem)
    private readonly dataRepository: Repository<DataItem>,
  ) {}

  async findAll(): Promise<DataItem[]> {
    return this.dataRepository.find();
  }

  async create(data: Partial<DataItem>, userName: string): Promise<DataItem> {
    const newItem = this.dataRepository.create({
      ...data,
      createdBy: userName,
    });
    return this.dataRepository.save(newItem);
  }
}
