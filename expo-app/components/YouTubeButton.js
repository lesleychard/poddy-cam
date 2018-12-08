import {Icon, Button, withTheme} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

class YouTubeButton extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        theme: PropTypes.object.isRequired,
    };

    styles = () => {
        const {theme} = this.props;
        return {
            button: {
                backgroundColor: theme.palette.youtubeColor,
                borderRadius: 10,
                height: 65,
                width: 200,
            },
            buttonText: {
                color: theme.palette.primaryTextColor,
                fontFamily: 'PoppinsBold',
                fontSize: 25,
                lineHeight: 35,
            },
        };
    };

    render() {
        const {
            text,
            theme,
            ...other
        } = this.props;

        const styles = this.styles();
        return (
            <Button
                icon={(
                    <Icon
                        color={theme.palette.primaryTextColor}
                        iconSet="FontAwesome"
                        name="youtube-play"
                        size={40}
                    />
                )}
                raised
                style={{
                    container: styles.button,
                    text: styles.buttonText,
                }}
                text={`  ${text}`}
                upperCase={false}
                {...other}
            />
        );
    }
}

export default withTheme(YouTubeButton);
