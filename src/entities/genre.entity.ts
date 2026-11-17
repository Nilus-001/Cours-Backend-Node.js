import {Column, Entity, ManyToMany, PrimaryGeneratedColumn, Relation} from "typeorm";
import {AnimeEntity} from "./anime.entity";

@Entity('genre')
export class GenreEntity {
    @PrimaryGeneratedColumn({name: 'id_genre'})
    id!: number;

    @Column('varchar')
    libelle!: string;

    @ManyToMany(() => AnimeEntity, (anime) => anime.genres)
    animes!: Relation<AnimeEntity[]>;
}
