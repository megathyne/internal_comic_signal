import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '../auth/user.entity';
import { Comic } from '../comic/comic.entity';
import { Vendor } from '../vendor/vendor.entity';
import { Grade } from '../grade/grade.entity';

@Entity()
export class Inventory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bin: number;

  @Column({ unique: true })
  tag: number;

  @ManyToOne(type => Comic, { eager: true })
  @JoinColumn()
  comic: Comic;

  @Column({ type: 'float', nullable: true })
  purchasedGrade: number;

  @ManyToOne(type => Grade, { eager: true })
  @JoinColumn()
  grade: Grade;

  @ManyToOne(type => Vendor, { eager: true })
  @JoinColumn()
  vendor: Vendor;

  @ManyToOne(
    type => User,
    user => user.inventory,
    { eager: false },
  )
  user: User;

  @Column()
  userId: number;

  @Column({ type: 'money' })
  cost: number;

  @Column({ type: 'date' })
  aquired: Date;

  @Column({ default: '' })
  notes: string;

  @Column({ type: 'money', nullable: true })
  currentValue: number;

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;
}
