import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Series extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}