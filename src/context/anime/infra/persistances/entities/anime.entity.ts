import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation} from "typeorm";
import {CategorieEntity} from "./categorie.entity";
import {SourceEntity} from "./source.entity";
import {ThemeEntity} from "./theme.entity";
import {ProducteurEntity} from "./producteur.entity";
import {GenreEntity} from "./genre.entity";
import {EpisodeEntity} from "./episode.entity";
import {AvisEntity} from "../../../../../entities/avis.entity";
import {VuOrAVoirEntity} from "../../../../../entities/vu-or-a-voir.entity";
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

    @OneToMany(() => EpisodeEntity, (episode) => episode.anime)
    episodes!: Relation<EpisodeEntity[]>;

    @OneToMany(() => AvisEntity, (avis) => avis.anime)
    avis!: Relation<AvisEntity[]>;

    @OneToMany(() => VuOrAVoirEntity, (vu) => vu.anime)
    vuOrAVoir!: Relation<VuOrAVoirEntity[]>;

    @OneToMany(() => NoterEntity, (noter) => noter.anime)
    notes!: Relation<NoterEntity[]>;
}
