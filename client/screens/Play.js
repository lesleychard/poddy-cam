import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import {withTheme} from 'react-native-material-ui';
import {connect} from 'react-redux';
import {PlayButton} from '../components';

// const env = require('../env.json');
const logo = require('../assets/logo.png');

const mapStateToProps = ({user}) => ({
    user: user.user,
});

const Play = connect(mapStateToProps)(class Play extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
    };

    styles = () => {
        const {theme} = this.props;
        return {
            view: {
                alignItems: 'center',
                backgroundColor: theme.palette.canvasColor,
                flex: 1,
                justifyContent: 'space-between',
            },
            imageLogo: {
                height: 150,
                width: 200,
            },
            viewContent: {
                alignItems: 'center',
                flex: 1,
                justifyContent: 'flex-start',
            },
            text: {
                color: theme.palette.primaryTextColor,
                lineHeight: 20,
            },
            textBold: {
                color: theme.palette.primaryTextColor,
                fontWeight: '500',
            },
            viewSpacer: {
                height: 20,
            },
        };
    };

    play = () => {
        const {navigation} = this.props;
        navigation.navigate('Stream');
    };

    render() {
        const {user} = this.props;
        const styles = this.styles();
        return (
            <View style={styles.view}>
                <Image
                    resizeMode="contain"
                    style={styles.imageLogo}
                    source={logo}
                />
                <View style={styles.viewContent}>
                    <Text style={styles.textBold}>
                        Welcome,
                        {' '}
                        {user.name.givenName}
                        !
                    </Text>
                    <Text style={styles.text}>
                        Click play to start spookin&rsquo; Pod.
                    </Text>
                    <View style={styles.viewSpacer} />
                    <PlayButton onPress={this.play} />
                </View>
            </View>
        );
    }
});

export default withTheme(Play);
