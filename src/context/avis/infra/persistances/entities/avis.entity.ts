import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation} from "typeorm";
import {CategorieAppreciationEntity} from "./categorie-appreciation.entity";
import {AnimeEntity} from "../../../../anime/infra/persistances/entities/anime.entity";
import {UserEntity} from "../../../../user/infra/persistances/entities/user.entity";

@Entity('avis')
export class AvisEntity {
    @PrimaryGeneratedColumn({name: 'id_avis'})
    id!: number;

    @Column('text', {nullable: true})
    commentaire!: string | null;

    @Column('int', {name: 'note_user', nullable: true})
    noteUser!: number | null;

    @Column('date', {name: 'date_avis', nullable: true})
    dateAvis!: Date | string | null;

    @Column('int', {name: 'id_avis_1', nullable: true})
    idAvisParent!: number | null;

    @Column('int', {name: 'id_categ_user', nullable: true})
    idCategorie!: number | null;

    @Column('int', {name: 'id_anime'})
    idAnime!: number;

    @Column('int', {name: 'id_user'})
    idUser!: number;

    @ManyToOne(() => AvisEntity, (avis) => avis.reponses, {nullable: true, onDelete: 'CASCADE'})
    @JoinColumn({name: 'id_avis_1'})
    avisParent!: Relation<AvisEntity> | null;

    @OneToMany(() => AvisEntity, (avis) => avis.avisParent)
    reponses!: Relation<AvisEntity[]>;

    @ManyToOne(() => CategorieAppreciationEntity, (categ) => categ.avis, {nullable: true})
    @JoinColumn({name: 'id_categ_user'})
    categorieAppreciation!: Relation<CategorieAppreciationEntity> | null;

    @ManyToOne(() => AnimeEntity, (anime) => anime.avis, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'id_anime'})
    anime!: Relation<AnimeEntity>;

    @ManyToOne(() => UserEntity, (user) => user.avis, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'id_user'})
    user!: Relation<UserEntity>;
}
