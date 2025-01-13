import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Upload {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, length: 255 })
  path: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_on: Date;

  @Column({ type: 'timestamptz', nullable: true })
  started_on: Date;

  @Column({ type: 'timestamptz', nullable: true })
  finished_on: Date;

  @Column({ type: 'integer', nullable: true })
  rows_added: number;
}
