import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { DateTime } from 'luxon';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public email: string;

  @Exclude()
  @Column()
  public password: string;

  @Column({ unique: true })
  public username: string;

  @Exclude()
  @Column({ nullable: true })
  public verificationCode: string;

  @Column({ nullable: true })
  public verifiedAt: DateTime;

  @CreateDateColumn()
  public createdAt: DateTime;

  @UpdateDateColumn()
  public updatedAt: DateTime;
}
