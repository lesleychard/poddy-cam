import {transitionBroadcast} from '../youtube';

const fetch = require('node-fetch');

const stop = async (broadcastId, streamId) => {
    console.log('stream stopped');

    // complete youtube broadcast (can't be reused)
    await transitionBroadcast(broadcastId, 'complete');

    process.exit(0);
};

export default stop;
