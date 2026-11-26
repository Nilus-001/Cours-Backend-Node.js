export type MailMessage = {
    to: string;
    subject: string;
    html: string;
    text?: string;
};

export interface IMailer {
    send(message: MailMessage): Promise<void>;
}
