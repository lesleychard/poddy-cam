import {authClient, user} from '../auth';

const init = async (session, code) => {
    console.log('Starting action: init...');

    return authClient
        .authenticate(session, code)
        .then(
            async function () {
                const thisUser = await user();
                if (thisUser) {
                    console.log('User found and verifed...');
                    const inserts = session.inserts;
                    const initData = {
                        user: thisUser,
                    };
                    return initData;
                } else {
                    console.log('User cound not be found or verified...');
                    // @TODO send appropriate errors
                }
            }
        )
        .catch(console.error);
};

export default init;