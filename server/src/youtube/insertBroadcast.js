import {authClient} from '../auth';
import moment from 'moment';

const {google} = require('googleapis');

const youtube = google.youtube({
    version: 'v3',
    auth: authClient.oAuth2Client,
});

const insertBroadcast = async () => {
    try {
        const result = await youtube.liveBroadcasts.insert(
            {
                part: 'id,snippet,status,contentDetails',
                requestBody: {
                    snippet: {
                        title: process.env.BROADCAST_TITLE,
                        scheduledStartTime: moment().format(),
                        scheduledEndTime: moment().add(10, 'minutes').format()
                    },
                    status: {
                        privacyStatus: 'unlisted',
                    },
                    contentDetails: {
                        monitorStream: {
                            enableMonitorStream: true,
                        },
                    },
                },
            },
        );
        return result.data.id;
    } catch (e) {
        console.log(e);
    }
};

export default insertBroadcast;
