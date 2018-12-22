import {
    listBroadcast,
    listStream,
    transitionBroadcast,
} from '../youtube';

const getBroadcastStatus = async (broadcastId) => {
    const broadcast = await listBroadcast(broadcastId);
    return broadcast[0].status.lifeCycleStatus;
}

const getStreamStatus = async (streamId) => {
    const stream = await listStream(streamId);
    return stream.status.streamStatus;
}

const play = async (broadcastId, streamId) => {
    console.log('Attempting to play stream...');

    // we can't transition broadcast status until stream is active
    let streamActive = false;
    while (!streamActive) {
        const status = await getStreamStatus(streamId);
        console.log('Stream status:', status);
        if (status === 'active') {
            streamActive = true;
        }
    }

    const broadcastStatus = await getBroadcastStatus(broadcastId);
    if (broadcastStatus === 'ready') {
        await transitionBroadcast(broadcastId, 'testing');
    }

    // we can't transition to live until broadcast transitions from
    // testStarting to testing
    let broadcastTesting = broadcastStatus === 'testing';
    while (!broadcastTesting) {
        const broadcastTestingStatus = await getBroadcastStatus(broadcastId);
        console.log('Broadcast status:', broadcastTestingStatus);
        if (broadcastTestingStatus === 'testing') {
            broadcastTesting = true;
        }
    }

    await transitionBroadcast(broadcastId, 'live');
    console.log('Stream is live...');

    // fallback in case shit goes awry
    setTimeout(
        () => {
            if (!streamActive) {
                console.log('Stream was not transitioned to active in 30s...');
                broadcastTesting = true;
                streamActive = true;
            }
        },
        30000
    );
}

export default play;
