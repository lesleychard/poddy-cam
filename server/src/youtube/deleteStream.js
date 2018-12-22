import {authClient} from '../auth';

const {google} = require('googleapis');

const youtube = google.youtube({
    version: 'v3',
    auth: authClient.oAuth2Client,
});

const deleteStream = async (id) => {
    try {
        const result = await youtube.liveStreams.delete(
            {
                id,
            }
        );
        return result;
    } catch (e) {
        console.log(e);
    }
}

export default deleteStream;
