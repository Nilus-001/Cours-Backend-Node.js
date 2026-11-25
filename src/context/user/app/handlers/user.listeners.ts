import {on} from '../../../../core/events/eventBus';

export const registerUserListeners = () => {
    on('user.created', async ({id, email}) => {
        console.log(`Mail de bienvenue envoyé à ${email} (user ${id})`);
    });
}
