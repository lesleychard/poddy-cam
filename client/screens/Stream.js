import {LinearGradient} from 'expo';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
    Image,
    View,
    WebView,
} from 'react-native';
import {Button, Icon, withTheme} from 'react-native-material-ui';

const env = require('../env.json');
const logo = require('../assets/logo.png');

class Stream extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
    };

    stop = () => {
        const {navigation} = this.props;
        const ws = new WebSocket(env.CAM_SERVER);
        ws.onopen = () => {
            ws.send('stop');
        };
        navigation.navigate('Play');
    };

    styles = () => {
        const {theme} = this.props;
        return {
            view: {
                alignItems: 'stretch',
                backgroundColor: theme.palette.canvasColor,
                flex: 1,
                justifyContent: 'flex-end',
            },
            viewYouTube: {
                bottom: 0,
                left: 0,
                position: 'absolute',
                right: 0,
                top: 0,
                zIndex: 0,
            },
            viewBottom: {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 20,
                position: 'relative',
                zIndex: 2,
            },
            imageLogo: {
                height: 60,
                width: 150,
            },
            viewGradient: {
                bottom: 0,
                left: 0,
                position: 'absolute',
                right: 0,
                zIndex: 1,
            },
            linearGradient: {
                height: 75,
            },
        };
    };

    render() {
        const {theme} = this.props;
        const styles = this.styles();
        return (
            <View style={styles.view}>
                <View style={styles.viewYouTube}>
                    <WebView
                        allowsInlineMediaPlayback
                        style={{flex: 1}}
                        javaScriptEnabled
                        domStorageEnabled
                        source={{
                            uri: `https://www.youtube.com/embed/${env.YOUTUBE_VIDEO_ID}?rel=0&autoplay=1&showinfo=0&controls=0`,
                        }}
                        mediaPlaybackRequiresUserAction={false}
                    />
                </View>
                <View style={styles.viewBottom}>
                    <Image
                        resizeMode="contain"
                        style={styles.imageLogo}
                        source={logo}
                    />
                    <Button
                        icon={(
                            <Icon
                                color={theme.palette.primaryTextColor}
                                iconSet="FontAwesome"
                                name="stop-circle"
                                size={30}
                            />
                        )}
                        onPress={this.stop}
                        text=""
                    />
                </View>
                <View style={styles.viewGradient}>
                    <LinearGradient
                        colors={['transparent', '#000']}
                        style={styles.linearGradient}
                    />
                </View>
            </View>
        );
    }
}

export default withTheme(Stream);
