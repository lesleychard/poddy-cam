import {authClient} from '../auth';

const {google} = require('googleapis');

const youtube = google.youtube({
    version: 'v3',
    auth: authClient.oAuth2Client,
});

const transitionBroadcast = async (id, status) => {
    try {
        const result = await youtube.liveBroadcasts.transition(
            {
                broadcastStatus: status,
                id,
                part: 'id,contentDetails,status',
            },
        );
        return result;
    } catch (e) {
        console.log(e);
    }
}

export default transitionBroadcast;
