import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation} from "typeorm";
import {AvisEntity} from "../../../../../entities/avis.entity";

const bigintTransformer = {
    to: (value?: bigint | null) => value?.toString(),
    from: (value?: string | null) => (value == null ? 0n : BigInt(value)),
};

@Entity('user_')
export class UserEntity {
    @PrimaryGeneratedColumn({name: 'id_user'})
    id!: number;

    @Column('varchar', {unique: true})
    identifiant!: string;

    @Column('varchar', {length: 255})
    email!: string;

    @Column('varchar', {name: 'mot_de_passe', select: false})
    motDePasse!: string;

    @Column('bigint', {unsigned: true, default: 0, transformer: bigintTransformer})
    perm!: bigint;

    @OneToMany(() => AvisEntity, (avis) => avis.user)
    avis!: Relation<AvisEntity[]>;
}
