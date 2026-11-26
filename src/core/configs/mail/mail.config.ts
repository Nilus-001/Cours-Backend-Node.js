import nodemailer from "nodemailer";
import getEnv from "../../utils/getEnv.utils";

export const MAIL_FROM = getEnv('MAIL_FROM');

export const transporter = nodemailer.createTransport({
    host: getEnv('MAIL_HOST'),
    port: Number(getEnv('MAIL_PORT')),
    secure: process.env.MAIL_SECURE === 'true',
    auth: process.env.MAIL_USER
        ? {user: process.env.MAIL_USER, pass: process.env.MAIL_PASSWORD}
        : undefined,
});
