import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation, VirtualColumn} from "typeorm";
import {CategorieEntity} from "./categorie.entity";
import {SourceEntity} from "./source.entity";
import {ThemeEntity} from "./theme.entity";
import {ProducteurEntity} from "./producteur.entity";
import {GenreEntity} from "./genre.entity";
import {EpisodeEntity} from "./episode.entity";
import {AvisEntity} from "../../../../avis/infra/persistances/entities/avis.entity";
import {NoterEntity} from "./noter.entity";

@Entity('anime')
export class AnimeEntity {
    @PrimaryGeneratedColumn({name: 'id_anime'})
    id!: number;

    @Column('varchar')
    nom!: string;

    @Column('text', {nullable: true})
    synopsis!: string | null;

    @Column('varchar', {nullable: true})
    image!: string | null;

    @Column('date', {name: 'date_annonce', nullable: true})
    dateAnnonce!: string | null;

    @ManyToOne(() => CategorieEntity, (categorie) => categorie.animes, {nullable: true})
    @JoinColumn({name: 'id_categorie'})
    categorie!: Relation<CategorieEntity> | null;

    @ManyToMany(() => SourceEntity, (source) => source.animes)
    @JoinTable({
        name: 'est_source',
        joinColumn: {name: 'id_anime', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'id_source', referencedColumnName: 'id'},
    })
    sources!: Relation<SourceEntity[]>;

    @ManyToMany(() => ThemeEntity, (theme) => theme.animes)
    @JoinTable({
        name: 'posseder',
        joinColumn: {name: 'id_anime', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'id_theme', referencedColumnName: 'id'},
    })
    themes!: Relation<ThemeEntity[]>;

    @ManyToMany(() => ProducteurEntity, (producteur) => producteur.animes)
    @JoinTable({
        name: 'organiser',
        joinColumn: {name: 'id_anime', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'id_prod', referencedColumnName: 'id'},
    })
    producteurs!: Relation<ProducteurEntity[]>;

    @ManyToMany(() => GenreEntity, (genre) => genre.animes)
    @JoinTable({
        name: 'est_attribuee',
        joinColumn: {name: 'id_anime', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'id_genre', referencedColumnName: 'id'},
    })
    genres!: Relation<GenreEntity[]>;

    @VirtualColumn({
        type: 'float',
        query: (alias) => `SELECT ROUND(AVG(n.note_user), 2) FROM avis n WHERE n.id_anime = ${alias}.id_anime AND n.id_avis_1 IS NULL AND n.note_user IS NOT NULL`,
        transformer: {to: (value) => value, from: (value) => (value == null ? null : Number(value))},
    })
    noteMoyenne!: number | null;

    @VirtualColumn({
        type: 'int',
        query: (alias) => `SELECT COUNT(n.note_user) FROM avis n WHERE n.id_anime = ${alias}.id_anime AND n.id_avis_1 IS NULL`,
        transformer: {to: (value) => value, from: (value) => Number(value ?? 0)},
    })
    nombreNotes!: number;

    @OneToMany(() => EpisodeEntity, (episode) => episode.anime)
    episodes!: Relation<EpisodeEntity[]>;

    @OneToMany(() => AvisEntity, (avis) => avis.anime)
    avis!: Relation<AvisEntity[]>;

    @OneToMany(() => NoterEntity, (noter) => noter.anime)
    notes!: Relation<NoterEntity[]>;
}
