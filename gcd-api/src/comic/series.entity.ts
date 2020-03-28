import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import { Issue } from "./issue.entity";

@Entity({name: 'gcd_series'})
export class Series extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    year_began: number;

    @OneToMany(type => Issue, issue => issue.series)
    issue: Issue[];
}