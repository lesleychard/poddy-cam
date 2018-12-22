import {LinearGradient} from 'expo';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Image,
    View,
    WebView,
} from 'react-native';
import {Button, Icon, withTheme} from 'react-native-material-ui';

const env = require('../env.json');
const logo = require('../assets/logo.png');

const mapStateToProps = ({inserts}) => ({
    inserts: inserts.inserts,
});

const Stream = connect(mapStateToProps)(class Stream extends Component {
    static propTypes = {
        inserts: PropTypes.object.isRequired,
        navigation: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
    };

    componentDidMount() {
        const {inserts} = this.props;
        fetch(`${env.CAM_SERVER}/play/broadcast/${inserts.broadcast}/stream/${inserts.stream}`, {
            method: 'POST',
        });
    }

    stop = () => {
        const {inserts, navigation} = this.props;
        fetch(`${env.CAM_SERVER}/stop/broadcast/${inserts.broadcast}/stream/${inserts.stream}`, {
            method: 'POST',
        });
        navigation.navigate('Home');
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
        const {inserts, theme} = this.props;
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
                            uri: `${env.CAM_SERVER}/stream/broadcast/${inserts.broadcast}/stream/${inserts.stream}`,
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
});

export default withTheme(Stream);
