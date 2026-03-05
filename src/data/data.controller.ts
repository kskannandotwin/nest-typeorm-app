import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get()
  async getAll() {
    return this.dataService.findAll();
  }

  @Post()
  async create(@Body() body: any) {
    // Note: In a real app, we'd get the user from the request (JWT)
    // For now, accepting userName in body as suggested by frontend code
    const { userName, ...data } = body;
    return this.dataService.create(data, userName || 'Anonymous');
  }
}
