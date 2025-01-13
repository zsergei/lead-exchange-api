import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    example: '9d52827e-2d2a-401c-a747-04dba62acc8a',
    description: 'User id',
  })
  id: string;

  @Column({ type: 'varchar', unique: true, length: 255 })
  @ApiProperty({
    example: '9d52827e@example.com',
    description: 'User email',
  })
  email: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    example: '2024-11-12 19:56:08+07',
    description: 'Created on timestamp',
  })
  created_on: Date;

  @Column({ type: 'timestamptz', nullable: true })
  @ApiProperty({
    example: '2024-11-12 19:56:08+07',
    description: 'Last login timestamp',
  })
  last_login_on: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @ApiProperty({
    example: '2024-11-12 19:56:08+07',
    description: 'Last changed timestamp',
  })
  last_changed_on: Date;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({
    example: '$2a$10$vZHY5HjxYLCn6n60dKAnzuLNEe9XXNwipuBNZFcD33OWtrJP7Oiu.',
    description: 'Hashed password',
  })
  password: string;

  @Column({ type: 'boolean', default: false, nullable: true })
  @ApiProperty({
    example: true,
    description: 'Is admin flag',
  })
  is_admin: boolean;

  @Column({ type: 'float', nullable: true })
  @ApiProperty({
    example: 442.32,
    description: 'Fee per number',
  })
  fee_per_num: number;

  @Column({ type: 'boolean', default: false, nullable: true })
  @ApiProperty({
    example: true,
    description: 'Is email verified flag',
  })
  is_email_verified: boolean;

  @Column({ type: 'integer', nullable: true })
  @ApiProperty({
    example: 598123,
    description: 'Last verification code',
  })
  verification_code: number;

  @Column({ type: 'float', nullable: true })
  @ApiProperty({
    example: 44.21,
    description: 'Balance value',
  })
  balance: number;

  @Column({ type: 'float', nullable: true })
  @ApiProperty({
    example: 12.09,
    description: 'Credit value',
  })
  credit: number;

  @Column({ nullable: true })
  @ApiProperty({
    example: '1112312dsfsdf',
    description: 'Reset token',
  })
  resetToken: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: '2024-11-12 19:56:08+07',
    description: 'Reset token expires timestamp',
  })
  resetTokenExpires: Date;
}
