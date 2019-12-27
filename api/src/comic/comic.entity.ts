import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Comic extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  series: string;

  @Column('int')
  volume: number;

  @Column('int')
  issue: number;

  @Column({ nullable: true })
  notes: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;
}
