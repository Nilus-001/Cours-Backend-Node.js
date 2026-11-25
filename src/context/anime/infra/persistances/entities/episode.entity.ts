import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Relation} from "typeorm";
import {SaisonEntity} from "./saison.entity";
import {AnimeEntity} from "./anime.entity";
import {LangueEntity} from "./langue.entity";
import {StudioEntity} from "./studio.entity";

@Entity('episode')
export class EpisodeEntity {
    @PrimaryGeneratedColumn({name: 'id_episode'})
    id!: number;

    @Column('varchar', {nullable: true})
    nom!: string | null;

    @Column('int', {nullable: true})
    duree!: number | null;

    @Column('date', {name: 'date_', nullable: true})
    date!: Date | null;

    @Column('int', {name: 'num_episode'})
    numEpisode!: number;

    @ManyToOne(() => SaisonEntity, (saison) => saison.episodes, {nullable: true})
    @JoinColumn({name: 'id_saison'})
    saison!: Relation<SaisonEntity> | null;

    @ManyToOne(() => AnimeEntity, (anime) => anime.episodes)
    @JoinColumn({name: 'id_anime'})
    anime!: Relation<AnimeEntity>;

    @ManyToMany(() => LangueEntity, (langue) => langue.episodes)
    @JoinTable({
        name: 'doubler',
        joinColumn: {name: 'id_episode', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'id_langue', referencedColumnName: 'id'},
    })
    langues!: Relation<LangueEntity[]>;

    @ManyToMany(() => StudioEntity, (studio) => studio.episodes)
    @JoinTable({
        name: 'est_produit',
        joinColumn: {name: 'id_episode', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'id_studio', referencedColumnName: 'id'},
    })
    studios!: Relation<StudioEntity[]>;
}
