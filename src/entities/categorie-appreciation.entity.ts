import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation} from "typeorm";
import {AvisEntity} from "./avis.entity";

@Entity('categorie_appreciation')
export class CategorieAppreciationEntity {
    @PrimaryGeneratedColumn({name: 'id_categ_user'})
    id!: number;

    @Column('varchar')
    categorie!: string;

    @OneToMany(() => AvisEntity, (avis) => avis.categorieAppreciation)
    avis!: Relation<AvisEntity[]>;
}
