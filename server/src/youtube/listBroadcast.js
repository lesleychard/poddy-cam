import {authClient} from '../auth';

const {google} = require('googleapis');

const youtube = google.youtube({
    version: 'v3',
    auth: authClient.oAuth2Client,
});

const listBroadcast = async (id) => {
    let params;
    let defaultParams = {
        part: 'id,contentDetails,snippet,status',
    };

    if (id) {
        params = Object.assign(
            defaultParams,
            {id},
        );
    }
    else {
        params = Object.assign(
            defaultParams,
            {broadcastStatus: 'upcoming'},
        );
    }

    console.log(params);

    try {
        const result = await youtube.liveBroadcasts.list(params);
        return result.data.items;
    } catch (e) {
        console.log(e);
    }
}

export default listBroadcast;
