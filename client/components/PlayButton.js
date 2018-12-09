import {Button, Icon, withTheme} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class PlayButton extends Component {
    static propTypes = {
        theme: PropTypes.object.isRequired,
    };

    styles = () => {
        const {theme} = this.props;
        return {
            button: {
                backgroundColor: theme.palette.primaryColor,
                borderRadius: 60,
                height: 120,
                width: 120,
            },
        };
    }

    render() {
        const {
            theme,
            ...other
        } = this.props;
        const styles = this.styles();
        return (
            <Button
                icon={(
                    <Icon
                        color={theme.palette.canvasColor}
                        name="play-arrow"
                        size={95}
                    />
                )}
                raised
                style={{container: styles.button}}
                text=" "
                {...other}
            />
        );
    }
}

export default withTheme(PlayButton);
