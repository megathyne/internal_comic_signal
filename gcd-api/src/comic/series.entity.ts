import { Entity, BaseEntity, Column } from "typeorm";

@Entity()
export class Series extends BaseEntity{
    @Column()
    id: number;

    @Column()
    name: string;
}