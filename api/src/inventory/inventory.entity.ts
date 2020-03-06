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
import { Vendor } from '../vendor/vendor.entity';
import { Issue } from '../issue/issue.entity';
import { Condition } from '../condition/condition.entity';
import { Grader } from '../grader/grader.entity';
import { Page } from '../page/page.entity';

@Entity()
export class Inventory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bin: number;

  @Column({ unique: true })
  tag: number;

  @Column({ unique: true, nullable: true })
  serial: string;

  @ManyToOne(type => Issue, { eager:  true })
  @JoinColumn()
  issue: Issue;

  @ManyToOne(type => Condition, { eager: true, nullable: true })
  @JoinColumn()
  condition: Condition;

  @ManyToOne(type => Grader, { eager: true, nullable: true })
  @JoinColumn()
  grader: Grader;

  @ManyToOne(type => Page, { eager: true, nullable: true })
  @JoinColumn()
  page: Page;

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

  @Column({ type: 'money', nullable: true })
  value: number;

  @Column({ type: 'date' })
  acquired: Date;

  @Column({ default: '' })
  notes: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;
}
