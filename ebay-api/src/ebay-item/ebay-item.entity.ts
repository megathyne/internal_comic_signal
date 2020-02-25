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

<<<<<<< Updated upstream
  @Column({ type: 'money' })
  finalPrice: number;
=======
  @Column({type: 'money', default: () => '0.00'})
  finalPrice: string;
>>>>>>> Stashed changes

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  country: string;

<<<<<<< Updated upstream
  @Column({ type: 'money' })
  shippingCost: number;
=======
  @Column({type: 'money', default: () => '0.00'})
  shippingCost: string;
>>>>>>> Stashed changes

  @Column({ nullable: true })
  listingType: string;

  @Column({ type: 'boolean' })
  bestOfferEnabled: boolean;

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;
}
