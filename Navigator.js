import {
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation';
import {
    Home,
    Play,
    Stream,
} from './screens';

const Navigator = createSwitchNavigator({
    Home,
    Play,
    Stream,
});

export default createAppContainer(Navigator);
