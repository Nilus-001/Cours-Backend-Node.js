import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Relation} from "typeorm";
import {TypeEntity} from "./type.entity";
import {AnimeEntity} from "./anime.entity";

@Entity('source')
export class SourceEntity {
    @PrimaryGeneratedColumn({name: 'id_source'})
    id!: number;

    @Column('varchar', {nullable: true})
    auteur!: string | null;

    @Column('date', {name: 'date_parution', nullable: true})
    dateParution!: Date | null;

    @ManyToOne(() => TypeEntity, (type) => type.sources)
    @JoinColumn({name: 'id_type'})
    type!: Relation<TypeEntity>;

    @ManyToMany(() => AnimeEntity, (anime) => anime.sources)
    animes!: Relation<AnimeEntity[]>;
}
