import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation} from "typeorm";
import {AnimeEntity} from "./anime.entity";

@Entity('categorie')
export class CategorieEntity {
    @PrimaryGeneratedColumn({name: 'id_categorie'})
    id!: number;

    @Column('varchar')
    libelle!: string;

    @OneToMany(() => AnimeEntity, (anime) => anime.categorie)
    animes!: Relation<AnimeEntity[]>;
}
