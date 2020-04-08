import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['itemId'])
export class EbayItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itemId: string;

  @Column()
  title: string;

  @Column()
  globalId: string;

  @Column()
  galleryURL: string;

  @Column()
  viewItemURL: string;

  @Column({ nullable: true })
  primaryCategoryId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  finalPrice: number;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  country: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  shippingCost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalCost: number;

  @Column({ nullable: true })
  listingType: string;

  @Column()
  endTime: Date;

  @Column({ type: 'boolean' })
  bestOfferEnabled: boolean;

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;
}
