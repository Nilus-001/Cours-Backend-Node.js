import {IMailer, MailMessage} from "./mailer.interface";
import {MAIL_FROM, transporter} from "../configs/mail/mail.config";

export class NodemailerMailer implements IMailer {
    async send(message: MailMessage): Promise<void> {
        await transporter.sendMail({from: MAIL_FROM, ...message});
    }
}

export const mailer: IMailer = new NodemailerMailer();

export const verifyMailer = async (): Promise<void> => {
    await transporter.verify();
}
