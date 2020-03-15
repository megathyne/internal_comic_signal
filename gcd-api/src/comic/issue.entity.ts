import { Entity, Unique, BaseEntity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Series } from "./series.entity";


@Entity()
export class Issue extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: number;

    @ManyToOne(type => Series, {eager: false})
    @JoinColumn()
    series: Series;

    
}