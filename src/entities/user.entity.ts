import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation} from "typeorm";
import {AvisEntity} from "./avis.entity";
import {VuOrAVoirEntity} from "./vu-or-a-voir.entity";

@Entity('user_')
export class UserEntity {
    @PrimaryGeneratedColumn({name: 'id_user'})
    id!: number;

    @Column('varchar', {unique: true})
    identifiant!: string;

    @Column('varchar', {length: 255, nullable: true})
    email!: string | null;

    @Column('varchar', {name: 'mot_de_passe', select: false})
    motDePasse!: string;

    @OneToMany(() => AvisEntity, (avis) => avis.user)
    avis!: Relation<AvisEntity[]>;

    @OneToMany(() => VuOrAVoirEntity, (vu) => vu.user)
    vuOrAVoir!: Relation<VuOrAVoirEntity[]>;
}
