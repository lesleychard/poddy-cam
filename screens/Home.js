import {Google} from 'expo';
import PropTypes from 'prop-types';
import React, {Fragment, Component} from 'react';
import {Text, View} from 'react-native';
import {Snackbar, withTheme} from 'react-native-material-ui';
import YouTubeButton from '../components';

const env = require('../env.json');
const users = require('../users.json');

class Home extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
    };

    state = {
        error: null,
    };

    signIn = async () => {
        const error = 'An error occurred while trying to sign in. Please try again.';

        try {
            const result = await Google.logInAsync({
                androidClientId: env.GOOGLE_ANDROID_CLIENT_ID,
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                this.setState({error: false});
                this.verifyUser(result.user.email);
            } else {
                this.setState({error});
            }
        } catch (e) {
            this.setState({error});
        }
    }

    verifyUser = (email) => {
        const {navigation} = this.props;
        if (users.indexOf(email) >= 0) {
            navigation.navigate('Play');
        } else {
            const error = 'You do not have permission to view Podrick at this time.';
            this.setState({error});
        }
    };

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
}

export default withTheme(Home);
