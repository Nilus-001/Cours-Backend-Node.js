import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation} from "typeorm";
import {AnimeEntity} from "../../../../anime/infra/persistances/entities/anime.entity";

@Entity('vu_or_a_voir')
export class FavoriteEntity {
    @PrimaryColumn('int', {name: 'id_anime'})
    idAnime!: number;

    @PrimaryColumn('int', {name: 'id_user'})
    idUser!: number;

    @Column('boolean', {name: 'est_favoris', default: false})
    estFavoris!: boolean;

    @Column('int', {name: 'classement_favoris', nullable: true})
    classementFavoris!: number | null;

    @ManyToOne(() => AnimeEntity, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'id_anime'})
    anime!: Relation<AnimeEntity>;
}
