import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'gcd_series'})
export class Series extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}