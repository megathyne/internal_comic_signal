import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export enum Grader {
  CGC = 'CGC',
  CBCS = 'CBCS',
  SELF = 'SELF',
  VENDOR = 'VENDOR',
}

export enum Pages {
  WHITE = 'WHITE',
  OFF_WHITE_TO_WHITE = 'OFF-WHITE_TO_WHITE',
  OFF_WHITE = 'OFF-WHITE',
  CREAM_TO_OFF_WHITE = 'CREAM_TO_OFF-WHITE',
  CREAM = 'CREAM',
  LIGHT_TAN_TO_OFF_WHITE = 'LIGHT_TAN_TO_OFF_WHITE',
  LIGHT_TAN_TO_CREAM = 'LIGHT_TAN_TO_CREAM',
  LIGHT_TAN = 'LIGHT_TAN',
  TAN_TO_OFF_WHITE = 'TAN_TO_OFF-WHITE',
  TAN_TO_CREAM = 'TAN_TO_CREAM',
  TAN = 'TAN',
  DARK_TAN_TO_OFF_WHITE = 'DARK_TAN_TO_OFF_WHITE',
  DARK_TAN = 'DARK_TAN',
  BROWN_TO_OFF_WHITE = 'BROWN_TO_OFF-WHITE',
  BROWN_TO_TAN = 'BROWN_TO_TAN',
  BROWN = 'BROWN',
  BROWN_TO_BRITTLE = 'BROWN_TO_BRITTLE',
}

@Entity()
export class Grade extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', nullable: true })
  grade: number;

  @Column({ type: 'enum', enum: Grader, nullable: true })
  grader: Grader;

  @Column({ type: 'enum', enum: Pages, nullable: true })
  pages: Pages;

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;
}
