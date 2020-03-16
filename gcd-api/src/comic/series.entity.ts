import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'gcd_series'})
export class Series extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({name:'year_began', type: 'int', select:true})
    yearBegan: number;
}