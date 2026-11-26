import {on} from '../../../../core/events/eventBus';
import {revokeToken, revokeUserTokens} from '../../infra/security/token-revocation.store';

export const registerAuthListeners = () => {
    on('auth.logout', ({jti, exp}) => revokeToken(jti, exp));
    on('auth.logout-all', ({userId}) => revokeUserTokens(userId));
    on('user.perm.updated', ({id}) => revokeUserTokens(id));
    on('user.deleted', ({id}) => revokeUserTokens(id));
}
