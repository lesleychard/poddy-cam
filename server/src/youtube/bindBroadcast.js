import {authClient} from '../auth';

const {google} = require('googleapis');

const youtube = google.youtube({
    version: 'v3',
    auth: authClient.oAuth2Client,
});

const bindBroadcast = async (inserts) => {
    try {
        console.log(inserts);
        const result = await youtube.liveBroadcasts.bind(
            {
                id: inserts.broadcast,
                part: 'id',
                requestBody: {
                    streamId: inserts.stream,
                }
            }
        );
        return result;
    } catch (e) {
        console.log(e);
    }
};

export default bindBroadcast;
