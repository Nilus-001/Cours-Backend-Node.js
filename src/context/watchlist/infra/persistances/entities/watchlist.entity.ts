import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation} from "typeorm";
import {AnimeEntity} from "../../../../anime/infra/persistances/entities/anime.entity";

@Entity('vu_or_a_voir')
export class WatchlistEntity {
    @PrimaryColumn('int', {name: 'id_anime'})
    idAnime!: number;

    @PrimaryColumn('int', {name: 'id_user'})
    idUser!: number;

    @Column('date', {name: 'date_visionnage', nullable: true})
    dateVisionnage!: Date | string | null;

    @Column('boolean', {name: 'is_watchlist', default: false})
    isWatchlist!: boolean;

    @Column('int', {name: 'currentwatch', nullable: true})
    currentWatch!: number | null;

    @Column('int', {nullable: true})
    ordre!: number | null;

    @ManyToOne(() => AnimeEntity, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'id_anime'})
    anime!: Relation<AnimeEntity>;
}
