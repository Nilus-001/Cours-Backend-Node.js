import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation} from "typeorm";
import {EpisodeEntity} from "./episode.entity";
import {DiffuserEntity} from "./diffuser.entity";

@Entity('saison')
export class SaisonEntity {
    @PrimaryGeneratedColumn({name: 'id_saison'})
    id!: number;

    @Column('int', {name: 'num_saison'})
    numSaison!: number;

    @Column('varchar', {nullable: true})
    nom!: string | null;

    @OneToMany(() => EpisodeEntity, (episode) => episode.saison)
    episodes!: Relation<EpisodeEntity[]>;

    @OneToMany(() => DiffuserEntity, (diffuser) => diffuser.saison)
    diffusions!: Relation<DiffuserEntity[]>;
}
