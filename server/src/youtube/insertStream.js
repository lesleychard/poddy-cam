import {authClient} from '../auth';

const {google} = require('googleapis');

const youtube = google.youtube({
    version: 'v3',
    auth: authClient.oAuth2Client,
});

const insertStream = async () => {
    try {
        const result = await youtube.liveStreams.insert(
            {
                part: 'id,snippet,cdn,status',
                requestBody: {
                    snippet: {
                        title: 'PoddyCam Stream',
                    },
                    cdn: {
                        frameRate: 'variable',
                        ingestionType: 'rtmp',
                        ingestionInfo: {
                            ingestionAddress: 'rtmp://a.rtmp.youtube.com/live2',
                            backupIngestionAddress: 'rtmp://a.rtmp.youtube.com/live2?backup=1',
                        },
                        resolution: 'variable',
                    },
                },
            },
        );
        return result.data.id;
    } catch (e) {
        console.log(e);
    }
};

export default insertStream;
