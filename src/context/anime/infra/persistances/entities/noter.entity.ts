import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation} from "typeorm";
import {AnimeEntity} from "./anime.entity";
import {SourceOfficielEntity} from "./source-officiel.entity";

@Entity('noter')
export class NoterEntity {
    @PrimaryColumn('int', {name: 'id_anime'})
    idAnime!: number;

    @PrimaryColumn('int', {name: 'id_source_officiel'})
    idSourceOfficiel!: number;

    @Column('varchar')
    note!: string;

    @ManyToOne(() => AnimeEntity, (anime) => anime.notes, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'id_anime'})
    anime!: Relation<AnimeEntity>;

    @ManyToOne(() => SourceOfficielEntity, (source) => source.notes, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'id_source_officiel'})
    sourceOfficiel!: Relation<SourceOfficielEntity>;
}
