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
@Unique(['userId','inventoryId','ebayItemId'])
export class Approval extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  
  @ManyToOne(type => User, { eager: false })
  userId: User;

  @ManyToOne(type => Inventory, {eager: false})
  inventoryId: Inventory;

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
