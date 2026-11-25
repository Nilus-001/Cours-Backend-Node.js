import {Column, Entity, ManyToMany, PrimaryGeneratedColumn, Relation} from "typeorm";
import {EpisodeEntity} from "./episode.entity";

@Entity('langue')
export class LangueEntity {
    @PrimaryGeneratedColumn({name: 'id_langue'})
    id!: number;

    @Column('varchar')
    libelle!: string;

    @ManyToMany(() => EpisodeEntity, (episode) => episode.langues)
    episodes!: Relation<EpisodeEntity[]>;
}
