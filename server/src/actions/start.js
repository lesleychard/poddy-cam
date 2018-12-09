import {authClient, user} from '../auth';

const start = (connection, code) => {
    console.log('Action: start...');

    authClient
        .authenticate(code)
        .then(
            async function () {
                const thisUser = await user();
                if (thisUser) {
                    console.log('User found and verifed...');
                    connection.sendUTF(JSON.stringify(thisUser));
                    // start stream
                } else {
                    console.log('User cound not be found or verified...');
                    // @TODO send appropriate errors
                }
            }
        )
        .catch(console.error);
};

export default start;