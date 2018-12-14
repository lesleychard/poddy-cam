import {AuthSession} from 'expo';
import PropTypes from 'prop-types';
import React, {Fragment, Component} from 'react';
import {Text, View} from 'react-native';
import {Snackbar, withTheme} from 'react-native-material-ui';
import {connect} from 'react-redux';
import {YouTubeButton} from '../components';
import {setUser} from '../state/actions';

const env = require('../env.json');

const Home = connect()(class Home extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        navigation: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
    };

    state = {
        error: null,
    };

    signIn = async () => {
        const {dispatch, navigation} = this.props;
        const error = 'An error occurred while trying to sign in. Please try again.';

        try {
            // get auth code for web server's google client
            const result = await AuthSession.startAsync({
                authUrl:
                    'https://accounts.google.com/o/oauth2/v2/auth?'
                    + `&client_id=${env.GOOGLE_AUTH_CLIENT_ID}`
                    + `&redirect_uri=${env.EXPO_URI}`
                    + '&response_type=code'
                    + '&access_type=offline'
                    + `&scope=${encodeURI('openid profile email https://www.googleapis.com/auth/youtube')}`,
            });

            if (result.type === 'success') {
                const ws = new WebSocket(env.CAM_SERVER);
                const params = JSON.stringify({
                    action: 'start',
                    ...result.params,
                });

                // send auth code to server
                ws.onopen = () => {
                    ws.send(params);
                };

                // recieve user data if found and verified
                // or false if user not found or not verified
                ws.onmessage = (e) => {
                    const user = JSON.parse(e.data);
                    if (user) {
                        dispatch(setUser(user));
                        navigation.navigate('Play');
                    } else {
                        // while the if statement is properly failing, setstate isn't technically working
                        // i think it's because auth is going to redirect uri and state is overwritten,
                        // but that's just a guess...
                        const userError = 'You do not have permission to view Podrick at this time.';
                        this.setState({error: userError});
                    }
                };
            } else {
                this.setState({error});
            }
        } catch (e) {
            this.setState({error});
        }
    }

    hideError = () => {
        this.setState({error: null});
    }

    styles = () => {
        const {theme} = this.props;
        return {
            view: {
                flex: 1,
                backgroundColor: theme.palette.canvasColor,
                alignItems: 'center',
                justifyContent: 'center',
            },
            text: {
                color: theme.palette.primaryTextColor,
                lineHeight: 40,
            },
            errorSnackbar: {
                backgroundColor: theme.palette.errorColor,
            },
            errorButtonText: {
                color: theme.palette.primaryTextColor,
            },
        };
    };

    render() {
        const styles = this.styles();
        const {error} = this.state;
        return (
            <Fragment>
                <View style={styles.view}>
                    <YouTubeButton
                        onPress={this.signIn}
                        text="Sign In"
                    />
                    <Text style={styles.text}>
                        with YouTube or Google
                    </Text>
                </View>
                <Snackbar
                    actionText="Try Again"
                    button={{
                        style: {
                            text: styles.errorButtonText,
                        },
                    }}
                    message={error || ''}
                    onActionPress={this.hideError}
                    onRequestClose={this.hideError}
                    style={{container: styles.errorSnackbar}}
                    visible={Boolean(error)}
                />
            </Fragment>
        );
    }
});

export default withTheme(Home);
