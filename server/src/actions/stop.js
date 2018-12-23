import {transitionBroadcast} from '../youtube';

const fetch = require('node-fetch');
const shell = require('shelljs');

const stop = async (broadcastId, streamId) => {
    console.log('stream stopped');

    // complete youtube broadcast (can't be reused)
    await transitionBroadcast(broadcastId, 'complete');

    shell.exec('./scripts/stop.sh');
};

export default stop;
