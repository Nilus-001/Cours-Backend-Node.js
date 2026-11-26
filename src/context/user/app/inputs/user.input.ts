export class UserToCreateInput {
    identifiant!: string;
    email!: string;
    hashedPassword!: string;
    perm!: bigint;
}

export class UserToUpdateInput {
    identifiant?: string;
    email?: string;
    hashedPassword?: string;
}

export class UserToAddInput {
    identifiant!: string;
    email!: string;
    motDePasse!: string;
}

export class UserToModifyInput {
    identifiant?: string;
    email?: string;
    motDePasse?: string;
}
