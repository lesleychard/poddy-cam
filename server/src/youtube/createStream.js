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
                        title: 'PoddyCam Broadcast',
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

const insertStream = async () => {
    try {
        const result = await youtube.liveStreams.insert(
            {
                part: 'id,snippet,cdn',
                requestBody: {
                    snippet: {
                        title: 'PoddyCam Stream',
                    },
                    cdn: {
                        format: '720p',
                        ingestionType: 'dash',
                        ingestionInfo: {
                            streamName: 'dclive_1_150@176260',
                            ingestionAddress: 'rtmp://p.ep176260.i.akamaientrypoint.net/EntryPoint',
                            backupIngestionAddress: 'rtmp://b.ep176260.i.akamaientrypoint.net/EntryPoint',
                        }
                    },
                },
            },
        );
        return result.data.id;
    } catch (e) {
        console.log(e);
    }
};

const createStream = async () => {
    console.log('Creating stream...');
    try {
        const inserts = {
            broadcast: await insertBroadcast(),
            stream: await insertStream(),
        };
        return inserts;
    } catch (e) {
        console.log(e)
    }
}

export default createStream;
