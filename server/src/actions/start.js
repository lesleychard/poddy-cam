import {authClient, user} from '../auth';
import {bindBroadcast, createStream} from '../youtube';

const streamSequence = async () => {
    try {
        createStream()
            .then(function (inserts) {
                bindBroadcast(inserts);
            });
    } catch (e) {
        console.log(e);
    }
};

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
                    streamSequence();
                } else {
                    console.log('User cound not be found or verified...');
                    // @TODO send appropriate errors
                }
            }
        )
        .catch(console.error);
};

export default start;