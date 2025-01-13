import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PhoneNumber {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_on: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lrn: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  last_changed_on: Date | null;

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
  @Column({ type: 'varchar', length: 255, nullable: true })
  ocn: string;

  @Index()
  @Column({ type: 'boolean', default: false, nullable: true })
  is_litigation: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  operator: string;

  @Column({ type: 'timestamptz', nullable: true })
  first_complaint_on: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  last_complaint_on: Date | null;
}
