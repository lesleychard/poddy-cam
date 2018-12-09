const {google} = require('googleapis');
const authClient = require('../auth/authClient');
const users = require('../../users.json');

const user = async () => {
    const plus = google.plus({
        version: 'v1',
        auth: authClient.oAuth2Client,
    });
    const result = await plus.people.get({userId: 'me'});
    return verify(result.data);
}

const verify = (data) => {
    const email = data.emails[0].value;
    if (users.indexOf(email) >= 0) {
        return data;
    } else {
        return false;
    }
}

export default user;
