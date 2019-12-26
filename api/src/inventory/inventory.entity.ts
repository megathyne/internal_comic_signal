import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '../auth/user.entity';
import { Comic } from '../comic/comic.entity';

@Entity()
@Unique(['comic'])
export class Inventory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  bin: number;

  @Column('int')
  quantity: number;

  @OneToOne(type => Comic, { eager: true })
  @JoinColumn()
  comic: Comic;

  @ManyToOne(
    type => User,
    user => user.inventory,
    { eager: false },
  )
  user: User;

  @Column()
  userId: number;

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;
}
