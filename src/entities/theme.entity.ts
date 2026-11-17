import {Column, Entity, ManyToMany, PrimaryGeneratedColumn, Relation} from "typeorm";
import {AnimeEntity} from "./anime.entity";

@Entity('theme')
export class ThemeEntity {
    @PrimaryGeneratedColumn({name: 'id_theme'})
    id!: number;

    @Column('varchar')
    libelle!: string;

    @ManyToMany(() => AnimeEntity, (anime) => anime.themes)
    animes!: Relation<AnimeEntity[]>;
}
