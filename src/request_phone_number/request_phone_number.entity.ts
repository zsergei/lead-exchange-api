import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Request } from '../requests/request.entity';

@Entity()
export class RequestPhoneNumber {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_on: Date;

  @Index()
  @ManyToOne(() => Request)
  @JoinColumn({ name: 'request_id' })
  request_id: number;

  @Index()
  @Column({ type: 'integer', nullable: true })
  phone_number_id: number;
}
