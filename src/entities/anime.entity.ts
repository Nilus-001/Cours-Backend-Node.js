import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('anime')
export class AnimeEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar')
    name!: string;
}