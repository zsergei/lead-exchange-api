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

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_on: Date;

  @Index('a_user_id')
  @ManyToOne(() => User)
  @JoinColumn({
    name: 'author_id',
    foreignKeyConstraintName: 'fk_custom_author_transaction',
  })
  author_id: string;

  @Index('t_user_id')
  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'fk_custom_user_transaction',
  })
  user_id: string;

  @Column({ type: 'float', nullable: true })
  credit: number;

  @Column({ type: 'float', nullable: true })
  debit: number;

  @Index()
  @Column({ type: 'varchar', length: 255, nullable: true })
  order_uuid: string;

  @Index()
  @Column({ type: 'varchar', length: 255, nullable: true })
  btcpay_id: string;

  @Column({ type: 'float', nullable: true })
  balance_before: number;

  @Column({ type: 'float', nullable: true })
  balance_after: number;

  @Index()
  @Column({ type: 'boolean', default: false, nullable: true })
  is_manual_credit: boolean;
}
