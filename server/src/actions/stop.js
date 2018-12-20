import {transitionBroadcast} from '../youtube';

const fetch = require('node-fetch');

const stop = async (broadcastId, streamId) => {
    console.log('stream stopped');

    // complete youtube broadcast (can't be reused)
    await transitionBroadcast(broadcastId, 'complete');

    // stop OBS stream
    fetch(`http://localhost:${process.env.OBS_HTTP_PORT}/stop`, {
        method: 'POST',
    });
};

export default stop;
