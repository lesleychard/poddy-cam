import {AppLoading, Font} from 'expo';
import React, {Component} from 'react';
import {getTheme, ThemeContext} from 'react-native-material-ui';
import theme from './styles';
import Navigator from './Navigator';

const Poppins = require('./assets/fonts/Poppins-Regular.ttf');
const PoppinsBold = require('./assets/fonts/Poppins-Bold.ttf');

class App extends Component {
    state = {
        fontLoaded: false,
    };

    async componentDidMount() {
        await Font.loadAsync({
            Poppins,
            PoppinsBold,
        });

        this.setState({fontLoaded: true});
    }

    render() {
        const {fontLoaded} = this.state;

        if (!fontLoaded) {
            return <AppLoading />;
        }

        return (
            <ThemeContext.Provider value={getTheme(theme)}>
                <Navigator />
            </ThemeContext.Provider>
        );
    }
}

export default App;
