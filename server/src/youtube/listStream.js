import {authClient} from '../auth';

const {google} = require('googleapis');

const youtube = google.youtube({
    version: 'v3',
    auth: authClient.oAuth2Client,
});

const listStream = async (id) => {
    try {
        const result = await youtube.liveStreams.list(
            {
                id,
                part: 'id,status,cdn',
            },
        );
        return result.data.items[0];
    } catch (e) {
        console.log(e);
    }
}

export default listStream;
