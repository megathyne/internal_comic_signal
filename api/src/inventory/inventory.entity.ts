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

@Entity()
@Unique(['tag'])
export class Inventory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bin: number;

  @Column()
  tag: number;

  @ManyToOne(type => Comic, { eager: true })
  @JoinColumn()
  comic: Comic;

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

  @Column({ type: 'float', nullable: true })
  grade: number;

  @Column({ type: 'boolean', nullable: true })
  graded: boolean;

  @Column({ type: 'money', nullable: true })
  currentValue: number;

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;
}
