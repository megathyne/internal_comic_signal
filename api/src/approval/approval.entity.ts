import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '../auth/user.entity';
import { Inventory } from '../inventory/inventory.entity';

@Entity()
@Unique(['user', 'inventory', 'ebayItemId'])
export class Approval extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, { eager: false })
  user: User;

  @ManyToOne(type => Inventory, { eager: false })
  inventory: Inventory;

  @Column()
  ebayItemId: number;

  @Column()
  isApproved: boolean;

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;
}
