export class userToCreateInput {
    identifiant!: string;
    email?: string | null;
    hashedPassword!: string;
    perm!: bigint;
}

export class userToUpdateInput {
    identifiant?: string;
    email?: string | null;
    hashedPassword?: string;
}

export class userToAddInput {
    identifiant!: string;
    email?: string | null;
    motDePasse!: string;
}

export class userToModifyInput {
    identifiant?: string;
    email?: string | null;
    motDePasse?: string;
}
