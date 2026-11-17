import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation} from "typeorm";
import {DiffuserEntity} from "./diffuser.entity";

@Entity('distributeur')
export class DistributeurEntity {
    @PrimaryGeneratedColumn({name: 'id_distrib'})
    id!: number;

    @Column('varchar')
    nom!: string;

    @Column('varchar', {nullable: true})
    dirigeant!: string | null;

    @OneToMany(() => DiffuserEntity, (diffuser) => diffuser.distributeur)
    diffusions!: Relation<DiffuserEntity[]>;
}
