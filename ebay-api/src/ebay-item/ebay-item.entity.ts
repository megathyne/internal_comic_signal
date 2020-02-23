import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, Unique } from 'typeorm';
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

  @Column({nullable: true})
  primaryCategoryId: string;

  @Column({type: 'decimal', default: () => '0.00'})
  finalPrice: string;

  @Column({nullable: true})
  location: string;

  @Column({nullable: true})
  country: string;

  @Column({type: 'decimal', default: () => '0.00'})
  shippingCost: string;

  @Column({nullable: true})
  listingType: string;

  @Column({type: 'boolean', default: () => 'false'})
  bestOfferEnabled: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;
}
