import {on} from '../../../../core/events/eventBus';
import {mailer} from '../../../../core/mailer/nodemailer.mailer';
import {welcomeTemplate} from '../../../../core/mailer/templates/welcome.template';

export const registerUserListeners = () => {
    on('user.created', async ({email, identifiant}) => {
        await mailer.send(welcomeTemplate(email, identifiant));
    });
}
