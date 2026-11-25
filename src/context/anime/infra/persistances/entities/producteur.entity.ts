import {Column, Entity, ManyToMany, PrimaryGeneratedColumn, Relation} from "typeorm";
import {AnimeEntity} from "./anime.entity";

@Entity('producteur')
export class ProducteurEntity {
    @PrimaryGeneratedColumn({name: 'id_prod'})
    id!: number;

    @Column('varchar')
    nom!: string;

    @ManyToMany(() => AnimeEntity, (anime) => anime.producteurs)
    animes!: Relation<AnimeEntity[]>;
}
