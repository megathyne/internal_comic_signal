import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Condition extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  numerical: number;

  @Column()
  abbreviation: string;

  @Column()
  name: string;

  @Column()
  code: string

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;
}
