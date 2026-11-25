import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation} from "typeorm";
import {AnimeEntity} from "../context/anime/infra/persistances/entities/anime.entity";
import {UserEntity} from "./user.entity";

@Entity('vu_or_a_voir')
export class VuOrAVoirEntity {
    @PrimaryColumn('int', {name: 'id_anime'})
    idAnime!: number;

    @PrimaryColumn('int', {name: 'id_user'})
    idUser!: number;

    @Column('date', {name: 'date_visionnage', nullable: true})
    dateVisionnage!: Date | null;

    @Column('boolean', {name: 'is_watchlist', default: false})
    isWatchlist!: boolean;

    @Column('int', {name: 'currentwatch', nullable: true})
    currentWatch!: number | null;

    @Column('int', {nullable: true})
    ordre!: number | null;

    @Column('boolean', {name: 'est_favoris', default: false})
    estFavoris!: boolean;

    @Column('int', {name: 'classement_favoris', nullable: true})
    classementFavoris!: number | null;

    @ManyToOne(() => AnimeEntity, (anime) => anime.vuOrAVoir, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'id_anime'})
    anime!: Relation<AnimeEntity>;

    @ManyToOne(() => UserEntity, (user) => user.vuOrAVoir, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'id_user'})
    user!: Relation<UserEntity>;
}
