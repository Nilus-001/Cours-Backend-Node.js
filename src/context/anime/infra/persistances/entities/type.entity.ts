import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation} from "typeorm";
import {SourceEntity} from "./source.entity";

@Entity('type')
export class TypeEntity {
    @PrimaryGeneratedColumn({name: 'id_type'})
    id!: number;

    @Column('varchar')
    libelle!: string;

    @OneToMany(() => SourceEntity, (source) => source.type)
    sources!: Relation<SourceEntity[]>;
}
