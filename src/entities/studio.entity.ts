import {Column, Entity, ManyToMany, PrimaryGeneratedColumn, Relation} from "typeorm";
import {EpisodeEntity} from "./episode.entity";

@Entity('studio')
export class StudioEntity {
    @PrimaryGeneratedColumn({name: 'id_studio'})
    id!: number;

    @Column('varchar')
    nom!: string;

    @Column('varchar', {nullable: true})
    dirigeant!: string | null;

    @ManyToMany(() => EpisodeEntity, (episode) => episode.studios)
    episodes!: Relation<EpisodeEntity[]>;
}
