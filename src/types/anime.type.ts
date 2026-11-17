class Anime {
    id!: number;

    nom!: string;

    synopsis!: string | null;

    image!: string | null;

    dateAnnonce!: Date | null;

    idCategorie!: number | null;
}

export default Anime
