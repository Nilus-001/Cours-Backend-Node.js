import {MailMessage} from "../mailer.interface";

export const welcomeTemplate = (to: string, identifiant: string): MailMessage => ({
    to,
    subject: 'Bienvenue sur AnimeAPI',
    text: `Bonjour ${identifiant}, ton compte a bien été créé.`,
    html: `<h1>Bienvenue ${identifiant} !</h1><p>Ton compte a bien été créé.</p>`,
});
