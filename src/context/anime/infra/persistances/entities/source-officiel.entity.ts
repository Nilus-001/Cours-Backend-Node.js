import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation} from "typeorm";
import {NoterEntity} from "./noter.entity";

@Entity('source_officiel')
export class SourceOfficielEntity {
    @PrimaryGeneratedColumn({name: 'id_source_officiel'})
    id!: number;

    @Column('varchar')
    source!: string;

    @OneToMany(() => NoterEntity, (noter) => noter.sourceOfficiel)
    notes!: Relation<NoterEntity[]>;
}
