import {authClient} from '../auth';

const {google} = require('googleapis');

const youtube = google.youtube({
    version: 'v3',
    auth: authClient.oAuth2Client,
});

const deleteBroadcast = async (id) => {
    try {
        const result = await youtube.liveBroadcasts.delete(
            {
                id,
            }
        );
        return result;
    } catch (e) {
        console.log(e);
    }
}

export default deleteBroadcast;
