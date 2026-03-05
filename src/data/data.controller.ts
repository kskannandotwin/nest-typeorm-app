import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { DataService } from './data.service';
import { DataItem } from './entities/data.entity';

@ApiTags('data')
@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get()
  @ApiOperation({ summary: 'Get all data items' })
  @ApiResponse({ status: 200, type: [DataItem] })
  async getAll() {
    return this.dataService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new data item' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        content: { type: 'string' },
        visibility: { type: 'string', enum: ['admin', 'user', 'both'] },
        userName: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 201, type: DataItem })
  async create(@Body() body: any) {
    // Note: In a real app, we'd get the user from the request (JWT)
    // For now, accepting userName in body as suggested by frontend code
    const { userName, ...data } = body;
    return this.dataService.create(data, userName || 'Anonymous');
  }
}
