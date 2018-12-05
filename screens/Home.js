import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {withTheme} from 'react-native-material-ui';
import YouTubeButton from '../components';

// eslint-disable-next-line react/prefer-stateless-function
class Home extends Component {
    static propTypes = {
        theme: PropTypes.object.isRequired,
    };

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
        };
    };

    render() {
        const styles = this.styles();
        return (
            <View style={styles.view}>
                <YouTubeButton
                    text="Sign In"
                />
                <Text style={styles.text}>
                    with YouTube
                </Text>
            </View>
        );
    }
}

export default withTheme(Home);
