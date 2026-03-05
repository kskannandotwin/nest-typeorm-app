import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('data_items')
export class DataItem {
  @ApiProperty({ example: 'uuid-string', description: 'The unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Strategic Roadmap', description: 'Item name' })
  @Column()
  name: string;

  @ApiProperty({ example: 'Q3 expansion...', description: 'Item content' })
  @Column('text')
  content: string;

  @ApiProperty({ example: 'user', enum: ['admin', 'user', 'both'] })
  @Column({
    type: 'enum',
    enum: ['admin', 'user', 'both'],
    default: 'user',
  })
  visibility: 'admin' | 'user' | 'both';

  @ApiProperty({ example: 'System' })
  @Column()
  createdBy: string;

  @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  @CreateDateColumn()
  createdAt: Date;
}
