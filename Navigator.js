import {
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation';
import Home from './screens';

const Navigator = createSwitchNavigator({
    Home,
});

export default createAppContainer(Navigator);
