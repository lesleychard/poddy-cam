import {AppLoading, Font} from 'expo';
import React, {Component} from 'react';
import {getTheme, ThemeContext} from 'react-native-material-ui';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import Navigator from './Navigator';
import rootReducer from './state/rootReducer';
import theme from './styles';


const Poppins = require('./assets/fonts/Poppins-Regular.ttf');
const PoppinsBold = require('./assets/fonts/Poppins-Bold.ttf');

const store = createStore(rootReducer);

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
            <Provider store={store}>
                <ThemeContext.Provider value={getTheme(theme)}>
                    <Navigator />
                </ThemeContext.Provider>
            </Provider>
        );
    }
}

export default App;
