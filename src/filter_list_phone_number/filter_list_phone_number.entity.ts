import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { FilterList } from '../filter_lists/filter_list.entity';

@Entity()
export class FilterListPhoneNumber {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_on: Date;

  @Index()
  @ManyToOne(() => FilterList)
  @JoinColumn({ name: 'filter_list_uuid' })
  filter_list_uuid: string;

  @Index()
  @Column()
  lrn: string;

  @Index()
  @Column({ type: 'boolean', default: false, nullable: true })
  purged: boolean;
}
