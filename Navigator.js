import {
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation';
import {Home, Play} from './screens';

const Navigator = createSwitchNavigator({
    Home,
    Play,
});

export default createAppContainer(Navigator);
