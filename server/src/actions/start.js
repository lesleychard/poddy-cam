import {
    listBroadcast,
    listStream,
    insertStream,
    bindBroadcast,
    insertBroadcast,
} from '../youtube';

const shell = require('shelljs');

const findBroadcast = async () => {
    const broadcasts = await listBroadcast();
    let broadcast = false;
    console.log(broadcasts);
    broadcasts.forEach((item) => {
        if (item.snippet.title === process.env.BROADCAST_TITLE) {
            broadcast = item;
        }
    });
    return broadcast;
}

const getStreamKey = async (streamId) => {
    const stream = await listStream(streamId);
    return stream.cdn.ingestionInfo.streamName;
}

const getInserts = async (session) => {
    // first, let's see if the inserts are stored in the session
    let inserts = session.inserts;
    if (inserts) {
        console.log('Found broadcast in session...');
        return session.inserts;
    }

    // if not in session, try user created broadcasts
    inserts = {};
    const existingBroadcast = await findBroadcast();
    if (existingBroadcast) {
        console.log('Found existing broadcast by name...');
        inserts.broadcast = existingBroadcast.id;
        const boundStream = existingBroadcast.contentDetails.boundStreamId;
        // broadcast already has bound stream, use it
        if (boundStream) {
            console.log('Found existing bound stream...');
            inserts.stream = boundStream;
            session.inserts = inserts;
            return inserts;
        }
        // broadcast doesn't have a bound stream yet, create one and bind it
        else {
            console.log('Creating and binding new stream...');
            const newStreamId = await insertStream();
            inserts.stream = newStreamId;
            await bindBroadcast(inserts);
            session.inserts = inserts;
            return inserts;
        }
    }
    // no broadcast exists with our name
    else {
        console.log('Creating new broadcast and stream...');
        const newBroadcastId = await insertBroadcast();
        const newStreamId = await insertStream();
        inserts = {
            broadcast: newBroadcastId,
            stream: newStreamId,
        };

        await bindBroadcast(inserts);
        session.inserts = inserts;
        return inserts;
    }
}

const stream = async (session) => {
    console.log(`Attempting to stream...`);

    const inserts = await getInserts(session);

    const streamKey = await getStreamKey(inserts.stream);

    console.log('stream key: ', streamKey);

    shell.exec(`STREAM_KEY=${streamKey} ./scripts/stream.sh`);

    return inserts;
};

export default stream;
