import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation} from "typeorm";
import {SaisonEntity} from "./saison.entity";
import {DistributeurEntity} from "./distributeur.entity";

@Entity('diffuser')
export class DiffuserEntity {
    @PrimaryColumn('int', {name: 'id_saison'})
    idSaison!: number;

    @PrimaryColumn('int', {name: 'id_distrib'})
    idDistrib!: number;

    @Column('date', {name: 'date_distribution', nullable: true})
    dateDistribution!: Date | null;

    @ManyToOne(() => SaisonEntity, (saison) => saison.diffusions, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'id_saison'})
    saison!: Relation<SaisonEntity>;

    @ManyToOne(() => DistributeurEntity, (distributeur) => distributeur.diffusions, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'id_distrib'})
    distributeur!: Relation<DistributeurEntity>;
}
