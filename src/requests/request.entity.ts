import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Payment } from '../payments/payment.entity';
import { FilterList } from '../filter_lists/filter_list.entity';

@Entity()
export class Request {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_on: Date;

  @Index()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: string;

  @Index()
  @ManyToOne(() => Payment)
  @JoinColumn({ name: 'payment_id' })
  payment_id: number;

  @Index()
  @ManyToOne(() => FilterList)
  @JoinColumn({ name: 'filter_list_uuid' })
  filter_list_uuid: string;

  @Index()
  @Column({ type: 'integer', nullable: true })
  count: number;

  @Index()
  @Column({ type: 'varchar', length: 2, nullable: true })
  country: string;

  @Index()
  @Column({ type: 'varchar', length: 2, nullable: true })
  state: string;

  @Index()
  @Column({ type: 'boolean', default: false, nullable: true })
  is_dno: boolean;

  @Index()
  @Column({ type: 'boolean', default: false, nullable: true })
  is_dnc: boolean;

  @Index()
  @Column({ type: 'boolean', default: false, nullable: true })
  is_litigation: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  process_start_on: Date;

  @Column({ type: 'timestamptz', nullable: true })
  process_end_on: Date;
}
