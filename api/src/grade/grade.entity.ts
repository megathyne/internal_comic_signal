import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export enum Grader {
  CGC = 'CGC',
  CBCS = 'CBCS',
  SELF = 'SELF',
}

export enum Pages {
  WHITE = 'WHITE',
}

@Entity()
export class Grade extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', nullable: true })
  grade: number;

  @Column({ type: 'enum', enum: Grader, default: Grader.SELF })
  grader: Grader;

  @Column({type: 'enum', enum: Pages})
  pages: Pages;

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;
}
