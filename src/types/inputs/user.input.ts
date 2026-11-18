export class userToCreateInput {
    identifiant!: string;
    email?: string | null;
    hashedPassword!: string;
}

export class userToUpdateInput {
    identifiant?: string;
    email?: string | null;
    hashedPassword?: string;
}
