export class userToCreateInput {
    identifiant!: string;
    hashedPassword!: string;
}

export class userToUpdateInput {
    identifiant?: string;
    hashedPassword?: string;
}
