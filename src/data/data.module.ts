import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataItem } from './entities/data.entity';
import { DataService } from './data.service';
import { DataController } from './data.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DataItem])],
  providers: [DataService],
  controllers: [DataController],
  exports: [DataService],
})
export class DataModule {}
