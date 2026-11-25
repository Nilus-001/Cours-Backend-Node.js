import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation} from "typeorm";
import {UserEntity} from "../context/user/infra/persistances/entities/user.entity";

@Entity('refresh_token')
export class RefreshTokenEntity {
    @PrimaryGeneratedColumn({name: 'id_refresh_token'})
    id!: number;

    @Column('varchar', {name: 'token_hash', length: 64, unique: true})
    tokenHash!: string;

    @Column('datetime', {name: 'date_expiration'})
    dateExpiration!: Date;

    @ManyToOne(() => UserEntity, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'id_user'})
    user!: Relation<UserEntity>;
}
