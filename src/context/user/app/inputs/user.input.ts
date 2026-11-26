export class UserToCreateInput {
    identifiant!: string;
    email?: string | null;
    hashedPassword!: string;
    perm!: bigint;
}

export class UserToUpdateInput {
    identifiant?: string;
    email?: string | null;
    hashedPassword?: string;
}

export class UserToAddInput {
    identifiant!: string;
    email?: string | null;
    motDePasse!: string;
}

export class UserToModifyInput {
    identifiant?: string;
    email?: string | null;
    motDePasse?: string;
}
