import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('data_items')
export class DataItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  content: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'user', 'both'],
    default: 'user',
  })
  visibility: 'admin' | 'user' | 'both';

  @Column()
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;
}
