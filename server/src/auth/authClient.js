// And why exactly do I need to require this?
const dotenv = require('dotenv');
dotenv.config();

const {google} = require('googleapis');

class AuthClient {
    constructor(options) {
        this._options = options || {scopes: []};

        this.oAuth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.EXPO_URI,
        );
        google.options({auth: this.oAuth2Client});
    }

    // keeping this session argument here for later
    async authenticate(session, code) {
        try {
            const {tokens} = await this.oAuth2Client.getToken(code);
            this.oAuth2Client.credentials = tokens;
            // @TODO save and read tokens from session
        } catch (e) {
            console.log(e);
        }
    }
}

export default new AuthClient();
